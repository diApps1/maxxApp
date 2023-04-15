import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../toaster.service';
import { EventProviderService } from '../services/event-provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firstName : any;
  lastName : any;
  email : any;
  gender : any;
  profile_pic : any;
  phone : any;
  address : any;
  userId : any;
  isUserLoggedIn : boolean = false;

  profile_picture_file: any;
  profile_picture: any;
  profile_picture_to_display: any;
  type: any = '';
  token :any ;
  extraData : any;
  userData : any;
  imageUrl : any = 'https://backendtestingsetup.tech';

  updateSpinner : boolean = false;
  error : boolean = false;

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
};


  constructor(private location : Location,private loader : LoaderService,private camera: Camera,
    private event_provider : EventProviderService,
    private dom : DomSanitizer,public actionSheetController: ActionSheetController,
    private router : Router,private auth_service : AuthService,
    private toaster : ToasterService) { }

  ngOnInit() {
   
  }

  ionViewDidEnter() {
    if(localStorage.getItem('access_token')) {
      this.getProfile();
     
    } else {
      this.toaster.presentToast('Sorry , you are using guest mode now, Session Expired' , 'warning');
      this.router.navigateByUrl('landing-page');
    }
  }

getProfile() {
      this.auth_service.getProfileByID(localStorage.getItem('access_token')).subscribe((res:any) => {
        // console.log(res.data.photo);
        // let img = 'data:image/jpeg;base64,' + btoa('https://backendtestingsetup.tech/public/storage/user/uaSH20dKidOJrjmuKUXSCQ72PZ8vaOmht5tykpLM.bin');
        // this.profile_picture = img;
        // console.log(img)
        if(res.success) {
          this.userData = res.data;
          this.firstName = res.data.first_name;
          this.lastName = res.data.last_name;
          this.email = res.data.email;
          this.phone = res.data.phone;
          this.address = res.data.address;
          this.userId = res.data.id;
          this.profile_picture = this.imageUrl + res.data.photo
        } else {
          this.toaster.presentToast(res.message , 'warning');
        }
      },(err:any) => {
        this.router.navigateByUrl('login');
        localStorage.clear();
        this.toaster.presentToast('Something went wrong Login Again' , 'danger');
      })
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
    // console.log(imageData , 'yahan gaya')
      imageData = 'data:image/jpeg;base64,' + imageData;
      // console.log(imageData , 'yahan aya')
      // let blob = this.convertToBlob(imageData);
      // this.profile_picture = blob;
      // console.log(this.profile_picture)
      this.profile_picture = imageData;
            let blob = this.convertToBlob(this.profile_picture);
            console.log(blob)
            this.profile_picture_file = blob;

            console.log(this.profile_picture_file)


      // this.profile_picture = imageData ? this.dom.bypassSecurityTrustResourceUrl(imageData) : "";
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
    // write the ArrayBuffer to a blob, and you're done
    const blob =  new Blob([ab], {
      type: mimeString
    });

    const fileType = blob.type.split('/')
    const file = new File([blob], "filename." + fileType[1],{ type: blob.type })
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
   

goToChangePassword() {
  const options = {queryParams: {data: JSON.stringify(this.userData)}};
  this.router.navigate(['change-password'] , options);


}




makeErrorTrue(from?:any) {
  
  this.error = true;
  setTimeout(() => {
    this.error = false;
  }, 1000);


}




  back() {
    this.location.back();
  }

  check(event:any) {
    console.log(event.target.files[0])
  }

  logOut () {
    this.loader.presentLoading().then(()  => {
      this.auth_service.logout().subscribe((res:any) => {
        if(res.success) {
          localStorage.clear();
          this.event_provider.addCart([]);
          this.isUserLoggedIn = false;
          this.toaster.presentToast('Log out succesfully' , 'success');
          this.router.navigateByUrl('landing-page');
          this.loader.stopLoading();
        } else {
          this.toaster.presentToast('Sorry You cant Logout' , 'warning');
          this.loader.stopLoading();
        }
      } , (err:any) => {
        this.toaster.presentToast('You are Not Logged In' , 'danger');
        this.loader.stopLoading();
      })
    })
  }

  updateProfile() {
    this.updateSpinner = true;
      const formData = new FormData();
      // formData.append('user_photo' , this.profile_picture)
      formData.append('id' , this.userId)
      formData.append('first_name' , this.firstName)
      formData.append('last_name' , this.lastName)
      formData.append('email' , this.email)
      formData.append('phone' , this.phone)
      formData.append('address' , this.address)
      formData.append('emirates_id' , 'aaaooo')
      formData.append('gender' , 'male')
      let body = {
        id : this.userId,
        first_name : this.firstName,
        last_name : this.lastName,
        email : this.email,
        phone : this.phone,
        address : this.address,
        user_photo : this.profile_picture,
        emirates_id : 'aaol'
      }
      console.log(body)
      this.auth_service.updateProfile(formData).subscribe((res:any) => {
        if(res) {
          this.updateSpinner = false;
      this.toaster.presentToast('Profile Updated Succesfully' , 'success');
      this.getProfile();
    } else {
      this.updateSpinner = false;
      this.makeErrorTrue();
      this.toaster.presentToast(res.message , 'warning');
        }
      } , (err:any) => {
        this.updateSpinner = false;
        this.makeErrorTrue();

        this.toaster.presentToast('Some thing went wrong' , 'danger');
      })
    
  }

}
