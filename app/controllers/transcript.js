import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service("session"),

    actions: {
        getPDF() {
            this.get("model.doc").output("save", "Co-Curricular Transcipt.pdf");
        }
    },
    createPDF() {
        var memberships = [];
        this.get("session").authorize("authorizer:oauth2", (headerName, headerValue) => {
            var currentSession = null;
            Ember.$.ajax({
                type: "GET",
                url: "https://gordon360api.gordon.edu/api/memberships/student/" + this.get("session.data.authenticated.token_data.id"),
                async: false,
                headers: {
                    "Authorization": headerValue
                },
                success: function(data) {
                    for (var i = 0; i < data.length; i ++) {
                        var part = data[i].Participation;
                        if (part === "AC" ||
                            part === "CAPT" ||
                            part === "CODIR" ||
                            part === "CORD" ||
                            part === "DIREC" ||
                            part === "PRES" ||
                            part === "RA1" ||
                            part === "RA2" ||
                            part === "RA3" ||
                            part === "SEC" ||
                            part === "VICEC" ||
                            part === "VICEP")
                        {
                            memberships.push(data[i]);
                        }
                    }
                }
            });
        });
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
        const LIST_FONT = 12;
        const LIST_WEIGHT = "normal";
        const LIST_START = 40;
        const LIST_SPACING = 7;
        const LIST_LINE_WIDTH = 0.2;
        const LIST_LINE_LENGTH = 125;
        const LINE_SPACE_BEFORE = 6;
        const LINE_SPACE_AFTER = 8;

        var ypos = MARGIN;
        var move = function(amout) {
            ypos += amout;
            if (ypos > HEIGHT - MARGIN) {
                doc.addPage();
                ypos = MARGIN;
            }
        };
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

        var doc = new jsPDF("p", "mm", [WIDTH, HEIGHT]);
        addText(MARGIN, TITLE_FONT, TITLE_WEIGHT, "Gordon 360");

        addLine(MARGIN, INNER_WIDTH, TITLE_LINE_WIDTH, 5);

        // Page Header
        addText(MARGIN, HEADER_FONT, HEADER_WEIGHT,
            "Co-Curricular Transcript - " + this.get("session.data.authenticated.token_data.name"));
        move(10);
        // Activity List
        doc.setLineWidth(LIST_LINE_WIDTH);
        for (var i = 0; i < memberships.length; i ++) {
            if (i !== 0) {
                addLine(MARGIN, INNER_WIDTH / 2, LIST_LINE_WIDTH, 6);
            }
            addText(MARGIN + TAB, LIST_FONT, LIST_WEIGHT,
                memberships[i].ActivityDescription);
            move(LIST_SPACING);
            addText(MARGIN + (TAB * 2), LIST_FONT, LIST_WEIGHT,
                memberships[i].ParticipationDescription);
            move(LIST_SPACING);
            addText(MARGIN + (TAB * 2), LIST_FONT, LIST_WEIGHT,
                this.getDate(memberships[i].StartDate) + " - " + this.getDate(memberships[i].EndDate));
        }
        return doc;
    },
    getDate(dateString) {
        var date = new Date(dateString);
        return ((date.getMonth() + 1) + "/" + date.getMonth() + "/" + date.getFullYear());
    }
});
