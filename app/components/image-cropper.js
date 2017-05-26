import Ember from 'ember';
import imageCropper from 'ember-cli-image-cropper/components/image-cropper';
import postFileAsync from "gordon360/utils/post-file-async";

export default imageCropper.extend({
  //override default options of cropper
  aspectRatio: 1,
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  cropperContainer: '.cropper-container > img',
  previewClass: '.img-preview',
  croppedAvatar: null,
  imageChange: Ember.observer('image', function() {
     let input = Ember.$('#file')[0];
     let image = this.get('image');
     console.log(image);
     console.log(input.files[0]);
     if (input.files && input.files[0]) {
         var reader = new FileReader();
        //  reader.onload = function (e) {
        //      $('#image-to-crop').attr('src', e.target.result);
        //  }
         reader.addEventListener("loadend", function() {
             $('#image-to-crop').attr('src', reader.result);
             $('.cropper-canvas > img').attr('src', reader.result);
             $('.cropper-view-box > img').attr('src', reader.result);
             $('.img-preview > img').attr('src', reader.result);
         })
         return reader.readAsDataURL(input.files[0]);
     }
  }),
  // cropperImageChange: Ember.observer('imageChange', function() {
  //     $('#image-to-crop').addEventListener("change", function() {
  //         let file = this.attr('src');
  //         $('.cropper-canvas > img').attr('src', file);
  //     });
  // }),
  actions: {
    getCroppedAvatar: function() {
      var container = this.$(this.get('cropperContainer'));
      var croppedImage = container.cropper('getCroppedCanvas');
      this.set('croppedAvatar', croppedImage);
    }
  }
});
