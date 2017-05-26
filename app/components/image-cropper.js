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
  movable: false,
  zoomable: false,
  imageChange: Ember.observer('image', function() {
     let input = Ember.$('#file')[0];
     let image = this.get('image');
     if (input.files && input.files[0]) {
         var reader = new FileReader();
         reader.addEventListener("loadend", function() {
             $('#image-to-crop').cropper('replace',reader.result);
             $('#cropper-div').show();
         })
         return reader.readAsDataURL(input.files[0]);
     }
  })
});
