import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ToasterService } from '../toaster.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-providers-detail',
  templateUrl: './service-providers-detail.page.html',
  styleUrls: ['./service-providers-detail.page.scss'],
})
export class ServiceProvidersDetailPage implements OnInit {
  paymentHandler:any = null;

  profile_picture_file: any;
  profile_picture: any;
  profile_picture_to_display: any;
  type: any = '';
  token :any ;
  extraData : any;

  productData : any;

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
};



  weekNameArray : any = [
    {dayName : 'MON' , active : true},
    {dayName : 'TUE' , active : false},
    {dayName : 'WED' , active : false},
    {dayName : 'THU' , active : false},
    {dayName : 'FRI' , active : false},
    {dayName : 'SAT' , active : false},
    {dayName : 'SUN' , active : false},
];
  constructor(private location : Location,private camera: Camera,
    private dom : DomSanitizer,
    public actionSheetController: ActionSheetController,

    private toastController: ToastController , private route:ActivatedRoute,
     private toaster : ToasterService) {
      this.route.queryParamMap.subscribe((params:any) => {
        this.productData = JSON.parse(params.params.data);
        // this.productsArray = JSON.parse(params.params.data);
      console.log(this.productData)
      })
     }

  ngOnInit() {}


  ionViewDidEnter() {
    
  }




  

  makeTrue(index:any) {
    this.weekNameArray.forEach((element : any) => {
      element.active = false;
    });
    this.weekNameArray[index].active = true;
  }

  back() {
    this.location.back();
  }

  bookMe() {
    this.toaster.presentToast('coming soon' , 'warning');
  }




 

 



  async presentAction(event:any) {
    // const actionSheet = await this.actionSheetController.create({
    //   header: 'Example header',
    //   subHeader: 'Example subheader',
    //   cssClass : 'my-custom-class',
    //   buttons: [
    //     {
    //       text: 'Delete',
    //       role: 'destructive',
    //       data: {
    //         action: 'delete',
    //       },
    //     },
    //     {
    //       text: 'Share',
    //       data: {
    //         action: 'share',
    //       },
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       data: {
    //         action: 'cancel',
    //       },
    //     },
    //   ],
    // });
    let buttons =  [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
            let options = this.getCameraOptions('camera');
            this.getPicture(options);
        }
    }, {
            text: 'Upload',
            icon: 'folder',
            handler: () => {
                    let options = this.getCameraOptions('library');
                    this.getPicture(options);
            }
        },
         {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
            }
        }
    ];
    let remove_button = {
        text: 'Remove',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
            this.removeProfileImage();
        }
    };

   
    const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: buttons
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
}


removeProfileImage() {
  this.profile_picture = '';
  this.profile_picture_file = '';
}

getPicture(opts : any) {
  this.camera.getPicture(opts).then((imageData) => {
      imageData = 'data:image/jpeg;base64,' + imageData;
      this.profile_picture = imageData ? this.dom.bypassSecurityTrustResourceUrl(imageData) : "";
      this.type = 'camera';
  }, (err) => {
      console.log("ERROR", err);
      // Handle error
  });
}

getCameraOptions(sourceType : any) {
  if (sourceType === 'camera') {
      this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
  } else if (sourceType === 'library') {
      this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
  }

  return this.cameraOptions;
}

}
