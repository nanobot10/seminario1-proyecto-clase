import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwalService } from './services/swal.service';
import { TranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ImageTextTranslate';
  languages = null;
  photoDefault = 'https://i.pinimg.com/originals/8d/57/da/8d57dad007688ab9d40ab672ea9eaeac.jpg';
  photo: any = null;
  sourceLanguage = null;
  targetLanguage = null;
  textDetected = null;
  textTranslated = null;

  constructor(private http: HttpClient,
              private swalService: SwalService,
              private translateService: TranslateService) {

  }

  ngOnInit(): void {
    this.http.get('assets/languages.json')
      .subscribe( data => {
        this.languages = data;
      });
  }


  onFileChanged(event) {
    const image = event.target.files[0];
    if(image){
      if (image.type.match(/image\/*/) == null) {
        this.swalService.showError('Solo imagenes son soportadas');
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (data) => {
        this.photo = reader.result;
      }
    }
  }


  reset() {
    this.photo = null;
    this.sourceLanguage = null;
    this.targetLanguage = null;
    this.textTranslated = null;
    this.textDetected = null;
  }


  translate() {
    
    if( !this.photo || !this.sourceLanguage || !this.targetLanguage) {
      this.swalService.showError('Debe seleccionar una imagen, lenguaje de origen y lenguaje destino para la traducción');
      return;
    }

    console.log(this.sourceLanguage);
    console.log(this.targetLanguage );

    const detectTextParams = {
      image: this.photo
    };
    
    this.swalService.showLoading('Translating');
    this.translateService.detectText(detectTextParams)
      .subscribe( (data: any) => {
        console.log( 'Texto detectado:',  data);
        if(data.success) {
          if(data.message.TextDetections.length === 0) {
            this.swalService.showError('No se ha logrado detectar el texto en la imagen');
          } else {

          const textLines = data.message.TextDetections.filter( text => text.Type === 'LINE').map(text => text.DetectedText).join('\n');
          console.log(textLines);
          this.textDetected = textLines;
          const translateParams = {
            "sourceLanguage": this.sourceLanguage,
            "targetLanguage": this.targetLanguage,
            "text": textLines
          };

          this.translateService.translateText(translateParams)
            .subscribe( (translateData: any) => {
               console.log(translateData); 
               if( translateData.success) {
                this.textTranslated = translateData.message.TranslatedText;
                this.swalService.close();
               } else {
                this.swalService.showError(translateData.message);
               }
               
            });
          }

        } else {
          this.swalService.showUnknownError();
        }

      });
  }

 
}
