import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        createPDF() {
            var doc = new jsPDF();
            doc.setFontSize(22);
            doc.text(20, 20, 'Gordon 360');

            doc.setFontSize(16);
            doc.text(20, 30, 'This is your Co-Curricular Transcript');
            console.log(doc);
            // doc.output('dataurlnewwindow');
            doc.output('save', 'Co-Curricular Transcipt.pdf');
        }
    }
});
