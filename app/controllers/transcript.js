import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import isTranscriptWorthy from "gordon360/utils/is-transcript-worthy";
import sortJsonArray from "gordon360/utils/sort-json-array";
import getEncodedtranscriptlogo from "gordon360/utils/transcript-logo";

/*  Controller for the transcript page.
 *  Handles user interaction with the page.
 *  Sends requests to the model to retrieve and/or modify data.
 */
export default Ember.Controller.extend({
    session: Ember.inject.service("session"),
    actions: {
        getPDF() {
            this.get("model.doc").save("Co-Curricular Transcipt.pdf");
        }
    },
    // Create the PDF document that is shown and can be downloaded
    createPDF() {
        let context = this;
        let memberships = [];
        let leaderships = [];
        let sessions = [];

        let getMemberships = function() {
            return getAsync("/memberships/student/" + context.get("session.data.authenticated.token_data.id"), context);
        }
        let sortMemberships = function(result) {
            for (let i = 0; i < result.length; i++) {
                if (isTranscriptWorthy(result[i].Participation)) {
                    if (result[i].Participation == "MEMBR") {
                        memberships.push(result[i]);
                    }
                    else {
                        leaderships.push(result[i]);
                    }
                }
            }
            // Sort in alphabetical order
            memberships = sortJsonArray(memberships, "ActivityDescription");
            leaderships = sortJsonArray(leaderships, "ActivityDescription");

            // Sort in chronological order
            memberships = sortJsonArray(memberships, "SessionCode").reverse();
            leaderships = sortJsonArray(leaderships, "SessionCode").reverse();
        }
        let getSessions = function() {
            return getAsync("/sessions", context)
            .then(function(result) {
                sessions = result;
            });
        }
        let formatMembershipsDate = function() {
            for (let i = 0; i < memberships.length; i ++) {
                memberships[i].StartDate = findSession(memberships[i].SessionCode).SessionBeginDate;
                memberships[i].EndDate = findSession(memberships[i].SessionCode).SessionEndDate;
            }
            for (let i = 0; i < leaderships.length; i ++) {
                leaderships[i].StartDate = findSession(leaderships[i].SessionCode).SessionBeginDate;
                leaderships[i].EndDate = findSession(leaderships[i].SessionCode).SessionEndDate;
            }
        }
        let findSession = function(sessionCode) {
            for (let i = 0; i < sessions.length; i ++) {
                if (sessions[i].SessionCode == sessionCode) {
                    return sessions[i];
                }
            }
        }
        let generatePDF = function() {
            // Using https://parall.ax/products/jspdf
            // (x, y)
            // text (x, y, string)
            // line (xleft, yleft, xright, yright)

            // Document Variables
            const MARGIN = 20;
            const WIDTH = 216;
            const HEIGHT = 279;
            const INNER_WIDTH = WIDTH - (MARGIN * 2);
            const INNER_HEIGHT = HEIGHT - (MARGIN * 2);
            const TAB = 10;
            const MM_PER_POINT = 0.25;
            const POINT_PER_MM = 1/MM_PER_POINT;
            // Image Variables
            const IMG_WIDTH = 28;
            const IMG_HEIGHT = 25;
            // Title Variables
            const TITLE_FONT = 24;
            const TITLE_WEIGHT = "bold";
            const TITLE_LINE_WIDTH = 0.3;
            // Title Variables
            const HEADER_FONT = 16;
            const HEADER_WEIGHT = "bold";
            // List Variables
            const LIST_FONT = 11;
            const LIST_WEIGHT = "normal";
            const LIST_START = 40;
            const LIST_SPACING = 7;
            const LIST_LINE_WIDTH = 0.2;
            const LIST_LINE_LENGTH = 125;
            const LINE_SPACE_BEFORE = 6;
            const LINE_SPACE_AFTER = 8;
            // Footer variables
            const IMG = getEncodedtranscriptlogo();
            const FOOTER_FONT = 9;

            var ypos = MARGIN;
            var move = function(amout) {
                ypos += amout;
                if (ypos > HEIGHT - MARGIN - 30) {
                    addFooter();
                    doc.addPage();
                    ypos = MARGIN;
                }
            };
            var addFooter = function() {
                doc.addImage(IMG, "JPEG", (INNER_WIDTH + 21) / 2, 242, 21, 18.75);
                doc.setFontSize(FOOTER_FONT);
                doc.text(68, 265, "Gordon College, 255 Grapevine Road, Wenham, MA 01984");
            }
            // Add text with specified x-position, size and weight
            // Moves ypos down the depending on the font size
            var addText = function(x, size, weight, string) {
                doc.setFontSize(size);
                move(size * MM_PER_POINT);
                doc.setFontType(weight);
                doc.text(x, ypos, string);
            };
            // Add horizontal line with specified x-position, length, width, and vertical-padding
            var addLine = function(x, length, width, padding) {
                move(padding);
                doc.line(x, ypos, x + length, ypos);
                move(padding);
            };
            // Changes date string into mm/dd/yyyy
            var getDate = function(dateString) {
                var date = new Date(dateString);
                return ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
            };

            var doc = new jsPDF("p", "mm", [WIDTH, HEIGHT]);
            addText(MARGIN, TITLE_FONT, TITLE_WEIGHT, "Gordon 360");

            addLine(MARGIN, INNER_WIDTH, TITLE_LINE_WIDTH, 5);

            // Page Header
            addText(MARGIN, HEADER_FONT, HEADER_WEIGHT,
                "Co-Curricular Transcript - " + context.get("session.data.authenticated.token_data.name"));

            if (leaderships.length > 0) {
                move(10);
                addText(MARGIN, HEADER_FONT, HEADER_WEIGHT, "Leadership positions");
            }

            // Leaderships
            doc.setLineWidth(LIST_LINE_WIDTH);
            for (var i = 0; i < leaderships.length; i++) {
                move(LIST_SPACING);
                addText(MARGIN, LIST_FONT, LIST_WEIGHT,
                    leaderships[i].ParticipationDescription);
                move(3);
                addText(MARGIN, LIST_FONT, LIST_WEIGHT,
                    leaderships[i].ActivityDescription);
                move(3);
                addText(MARGIN, LIST_FONT, LIST_WEIGHT,
                    getDate(leaderships[i].StartDate) + " - " + getDate(leaderships[i].EndDate));
            }

            if (memberships.length > 0) {
                move(10);
                addText(MARGIN, HEADER_FONT, HEADER_WEIGHT, "Memberships");
            }

            // Memberships
            for (var i = 0; i < memberships.length; i++) {
              move(LIST_SPACING);
              addText(MARGIN, LIST_FONT, LIST_WEIGHT,
                  memberships[i].ActivityDescription);
              move(3);
              addText(MARGIN, LIST_FONT, LIST_WEIGHT,
                  getDate(memberships[i].StartDate) + " - " + getDate(memberships[i].EndDate));
            }

            addFooter();

            return doc;
        }
        // Run all the functions
        return getMemberships()
        .then(sortMemberships)
        .then(getSessions)
        .then(formatMembershipsDate)
        .then(generatePDF);
    }
});
