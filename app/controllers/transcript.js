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
                    memberships = data;
                }
            });
        });
        // Using https://parall.ax/products/jspdf
        // (x, y)
        // text (x, y, string)
        // line (x, yleft, width, yright)
        const MARGIN = 20;
        const WIDTH = 216;
        const HEIGHT = 279;
        const PAGE_FONT = 12;
        const TAB = 10;
        const LINE_SPACING = 8;
        // Title Variables
        const TITLE_FONT = 24;
        const TITLE_WEIGHT = 'bold';
        // Title Variables
        const HEADER_FONT = 16;
        const HEADER_WEIGHT = 'bold';
        // List Variables
        const LIST_FONT = 12;
        const LIST_WEIGHT = 'normal';
        const LIST_START = 40;
        const LIST_SPACING = 7;

        var ypos = MARGIN;
        var move = function(amout) {
            ypos += amout;
            if (ypos > HEIGHT - MARGIN) {
                doc.addPage();
                ypos = MARGIN;
            }
        }

        var doc = new jsPDF('p', 'mm', [WIDTH, HEIGHT]);
        var img = "images/gordon-logo-vertical-white.svg";
        // Page Title
        doc.setFontSize(TITLE_FONT);
        doc.setFontType(TITLE_WEIGHT);
        doc.text(MARGIN, ypos, 'Gordon 360');
        move(5);
        doc.setLineWidth(0.3);
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
        for (var i = 0; i < memberships.length; i ++) {
            let pos = i * 3;
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
            move(LIST_SPACING);
        }
        return doc;
    },
    getDate(dateString) {
        var date = new Date(dateString);
        return ((date.getMonth() + 1) + '/' + date.getMonth() + '/' + date.getFullYear());
    }
});
