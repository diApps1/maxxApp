import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ToasterService } from '../toaster.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ActivatedRoute, Router } from '@angular/router';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { EventProviderService } from '../services/event-provider.service';
import {
  trigger,
  state,
  style,
  animate,
  sequence,
  keyframes,
  transition,
  useAnimation,
  query,
} from '@angular/animations';
@Component({
  selector: 'app-service-providers-detail',
  templateUrl: './service-providers-detail.page.html',
  styleUrls: ['./service-providers-detail.page.scss'],
  animations: [
    trigger('bounce', [
      // state('inital', style({transform: 'translateY(0)'})),
      state('active', style({transform: 'translateY(0)'})),
      state('inactive', style({transform: 'translateY(0)'})),
      // transition('initial => active', [
      //   animate('500ms cubic-bezier(0,0,0,1)'),
      // ]),
      // transition('active => initial', [
      //   animate('500ms cubic-bezier(1,0,1,1)'),
      // ]),
      transition('* => active', [
        sequence([
          style({ transform: 'translateY(0)'}),
          animate("400ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-20px)' })),
          animate("300ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("200ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-10px)' })),
          animate("150ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("100ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-5px)' })),
          animate("80ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
        ]),
      ]),
      transition('* => inactive', [
        sequence([
          style({ transform: 'translateY(0)'}),
          animate("400ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-20px)' })),
          animate("300ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("200ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-10px)' })),
          animate("150ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
          animate("100ms cubic-bezier(0,0,0,1)", style({ transform: 'translateY(-5px)' })),
          animate("80ms cubic-bezier(1,0,1,1)", style({ transform: 'translateY(0)' })),
        ]),
      ])
    ]),
  
  ]
})
export class ServiceProvidersDetailPage implements OnInit {
  paymentHandler:any = null;

  profile_picture_file: any;
  profile_picture: any;
  profile_picture_to_display: any;
  type: any = '';
  token :any ;
  extraData : any;
  cartArray : any = [];
  productData : any;
  state : any = '';
  enter:any  ='';
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
    private router : Router,
     private toaster : ToasterService,private event_provider : EventProviderService) {
      // this.route.queryParamMap.subscribe((params:any) => {
      //   this.productData = JSON.parse(params.params.data);
      //   // this.productsArray = JSON.parse(params.params.data);
      // console.log(this.productData)
      // })

      
     }

  ngOnInit() {
  }
  drag(event:any , slidingItem:any) {
    if(event.detail.amount < -180) {
      this.bookMe();
    }
  }

  ionViewDidEnter() {
    this.state = this.state ? 'inactive' : 'active';
    this.enter = this.enter ? '' : 'enter';

    this.cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : '';
    console.log(this.cartArray)
    //  setTimeout(() => {
    //   this.localNotifications.schedule({
    //     title: 'My first notification',
    //     text: 'Thats pretty easy...',
    //     foreground: true
    //   });
    // }, 2000);
    
  }



  emptyCart() {
    
  }

  deleteFromCart(index:any) {
    console.log(index)
    this.cartArray.splice(index , 1);
    this.event_provider.addCart(this.cartArray)
    console.log(this.cartArray)
  }



  back() {
    this.location.back();
  }

  bookMe() {
    this.router.navigateByUrl('payment');
    //    this.localNotifications.schedule({
    //     title: 'sorry for regret.!',
    //     text: 'This feature is coming soon',
    //     icon : 'assets/img/lamp-icon.png',
    //     foreground: true
    //   });
    // this.toaster.presentToast('coming soon' , 'warning');
  }




 

 



  async presentAction(event:any) {
    console.log(event.target)
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
    console.log(imageData , 'yahan gaya')
      imageData = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData , 'yahan aya')
      let blob = this.convertToBlob(imageData);
      console.log('blob' , blob)
      this.profile_picture = imageData ? this.dom.bypassSecurityTrustResourceUrl(imageData) : "";
      console.log(this.profile_picture)
      this.type = 'camera';
  }, (err) => {
      console.log("ERROR", err);
      // Handle error
  });
}

convertToBlob(base64image:any) {
  // convert base64 to raw binary data held in a string
  var byteString = atob(base64image.split(',')[1]);
  // separate out the mime component
  var mimeString = base64image.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var dw = new DataView(ab);
  for (var i = 0; i < byteString.length; i++) {
    dw.setUint8(i, byteString.charCodeAt(i));
    console.log("arrived here");

    // write the ArrayBuffer to a blob, and you're done
    const blob =  new Blob([ab], {
      type: mimeString
    });

    const file = new File([blob], "File name",{ type: "image/png" })
    return file;
  }
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
