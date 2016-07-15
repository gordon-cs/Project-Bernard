import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        getPDF() {
            this.get('model.doc').output('save', 'Co-Curricular Transcipt.pdf');
        }
    },
    createPDF() {
        var memberships = [];
        this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
            var currentSession = null;
            Ember.$.ajax({
                type: "GET",
                url: "http://gordon360api.gordon.edu/api/students/" + this.get('session.data.authenticated.token_data.id') + "/memberships",
                async: false,
                headers: {
                    "Authorization": headerValue
                },
                success: function(data) {
                    for (var i = 0; i < data.length; i ++) {
                        var part = data[i].ParticipationCode;
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
        // line (x, yleft, length, yright)

        // Document Variables
        const MARGIN = 20;
        const WIDTH = 216;
        const HEIGHT = 279;
        const PAGE_FONT = 12;
        const TAB = 10;
        // Image Variables
        const IMG_WIDTH = 28;
        const IMG_HEIGHT = 25;
        // Title Variables
        const TITLE_FONT = 24;
        const TITLE_WEIGHT = 'bold';
        const TITLE_LINE_WIDTH = 0.3;
        // Title Variables
        const HEADER_FONT = 16;
        const HEADER_WEIGHT = 'bold';
        // List Variables
        const LIST_FONT = 12;
        const LIST_WEIGHT = 'normal';
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

        var doc = new jsPDF('p', 'mm', [WIDTH, HEIGHT]);
        // Page Title
        doc.setFontSize(TITLE_FONT);
        doc.setFontType(TITLE_WEIGHT);
        doc.text(MARGIN, ypos, 'Gordon 360');
        move(5);
        doc.setLineWidth(TITLE_LINE_WIDTH);
        doc.line(MARGIN, ypos, WIDTH - MARGIN, ypos);
        move(8);
        // Page Header
        doc.setFontSize(HEADER_FONT);
        doc.setFontType(HEADER_WEIGHT);
        doc.text(MARGIN, ypos, 'Co-Curricular Transcript - ' + this.get('session.data.authenticated.token_data.name'));
        move(10);
        // Activity List
        doc.setFontSize(LIST_FONT);
        doc.setFontType(LIST_WEIGHT);
        doc.setLineWidth(LIST_LINE_WIDTH);
        for (var i = 0; i < memberships.length; i ++) {
            if (i !== 0) {
                move(LINE_SPACE_BEFORE);
                doc.line(MARGIN + TAB, ypos, LIST_LINE_LENGTH, ypos);
                move(LINE_SPACE_AFTER);
            }
            doc.text(MARGIN + TAB,
                ypos,
                memberships[i].ActivityDescription);
            move(LIST_SPACING);
            doc.text(MARGIN + (TAB * 2),
                ypos,
                memberships[i].ParticipationDescription);
            move(LIST_SPACING);
            doc.text(MARGIN + (TAB * 2),
                ypos,
                this.getDate(memberships[i].StartDate) + " - " + this.getDate(memberships[i].EndDate));
        }
        return doc;
    },
    getDate(dateString) {
        var date = new Date(dateString);
        return ((date.getMonth() + 1) + '/' + date.getMonth() + '/' + date.getFullYear());
    }
});
