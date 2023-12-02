import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { MatkaGameService } from '../services/matka-game.service';
import { AuthenticationService } from '../services/authentication.service';
import { GameService } from '../services/game.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css'], 
  encapsulation: ViewEncapsulation.None
  
})
export class GameComponentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private GameService: GameService) { }
  public error_msg = false;
  public errorMsg = '';
  public gamesData = {title: '', start_time: '', end_time: ''};
  currentDate = new Date();
  public bidDataSingle = [];
  public bidDataPanna = [];
  public bidDataJodi = [];
  public bidDataCP = [];
  public cpbidNos = [];
  public bidTab = false;
  public showDigit = false;
  public showCpPrice = false;
  public showDigitbtn = true;
  public gameId = this.route.snapshot.paramMap.get('id');
  public playSingleForm = {
    game_id: this.gameId,
    price: '',
    digit: '',
    token: localStorage.getItem('token')
  }
  public playPannaForm = {
    game_id: this.gameId,
    price: '',
    digit: '',
    token: localStorage.getItem('token')
  }
  public playJodiForm = {
    game_id: this.gameId,
    price: '',
    digit: '',
    token: localStorage.getItem('token')
  }
  public playCPForm = {
    game_id: this.gameId,
    price: '',
    digit: '',
    token: localStorage.getItem('token')
  }
  public getBidListData = {
    game_id: this.gameId,
    token: localStorage.getItem('token')
  }
  public deleteBidForm = {
    bidid: '',
    play_type: '',
    token: localStorage.getItem('token')
  }
  public playnowForm = {
    game_id: this.gameId,
    type: '',
    token: localStorage.getItem('token')
  }

  
  ngOnInit(): void {
    this.getGame();
    this.getBidLists();
  }

  public twodigit(event: any) {
    const NUMBER_REGEXP = "\d{2}";
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, 2);
      this.playJodiForm.digit = event.target.value;
    }
  }
  
  public threedigit(event: any) {
    const NUMBER_REGEXP = "\d{3}";
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, 3);
      this.playPannaForm.digit = event.target.value;
    }
  }

  clearform() {
    this.playSingleForm.digit = '';
    this.playSingleForm.price = '';
    this.playPannaForm.digit = '';
    this.playPannaForm.price = '';
    this.playJodiForm.digit = '';
    this.playJodiForm.price = '';
    this.playCPForm.digit = '';
    this.playCPForm.price = '';
  }

  getGame(){
    // console.log('Game id --------',this.gameId);
    this.GameService.getGameDetails(this.gameId).subscribe({
      next: (v) => {
        // console.log('Games Data - ',v.data);
        if(v.data.gameData){          
          this.gamesData = v.data.gameData;
          this.bidTab = true;
          console.log('gamesData Data - ',this.gamesData);
        }
      },
      error: (e) => {        
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Not Found";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Not authorised";
          }
      },
      complete: () => console.info('complete'),
      
    });


  }

  getBidLists() {
    console.log(this.getBidListData);

    this.GameService.getBidList(this.getBidListData).subscribe({
      next: (v) => {
        console.log(v.data.singlebids);
        if(v.data.singlebids){
          console.log('sbiddata', v.data.singlebids);
          this.bidDataSingle = v.data.singlebids;
        }
        if(v.data.pannabids){
          console.log('pbiddata', v.data.pannabids);
          this.bidDataPanna = v.data.pannabids;
        }
        if(v.data.jodibids){
          console.log('jbiddata', v.data.jodibids);
          this.bidDataJodi = v.data.jodibids;
        }
        if(v.data.cpbids){
          console.log('cpbiddata', v.data.cpbids);
          this.bidDataCP = v.data.cpbids;
        }
        
      },
      error: (e) => {
        console.log(e.status);
        console.log(e.status);
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Something went wrong";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Something went wrong";
          }
      },
      complete: () => console.info('complete'),
      
    });
  }

  playSingle(){
    console.log(this.playSingleForm);
    if(this.playSingleForm.digit == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Digit',
        icon: "error"
      });
    } else if(this.playSingleForm.price == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Price',
        icon: "error"
      });
    } else {
      this.GameService.playGameSingle(this.playSingleForm).subscribe({
        next: (v) => {
          console.log(v.data.insertedData);
          if(v.data.insertedData){
            console.log(v.success);
            Swal.fire({
              title: "Success",
              text: v.data.msg,
              icon: "success"
            });
            this.playSingleForm.digit = '';
            this.playSingleForm.price = '';
            this.getBidLists();
            this.router.navigate(['/play-game/'+this.gameId]);
          }
          
        },
        error: (e) => {
          console.log(e.status);
          console.log(e.status);
            if(e.status==400){
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
            if(e.status==401){
              localStorage.clear();
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
        },
        complete: () => console.info('complete'),
        
      });
    }
  }

  playPanna() {
    console.log(this.playPannaForm);
    if(this.playPannaForm.digit == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Digit',
        icon: "error"
      });
    } else if(this.playPannaForm.price == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Price',
        icon: "error"
      });
    } else {
      this.GameService.playGamePanna(this.playPannaForm).subscribe({
        next: (v) => {
          console.log(v.data.insertedData);
          if(v.data.status == 'success'){
            if(v.data.insertedData){
              console.log(v.success);
              Swal.fire({
                title: "Success",
                text: v.data.msg,
                icon: "success"
              });
              this.playPannaForm.digit = '';
              this.playPannaForm.price = '';
              this.getBidLists();
              this.router.navigate(['/play-game/'+this.gameId]);
            }
          } else {
            Swal.fire({
              title: "Error",
              text: v.data.msg,
              icon: "error"
            });
          }
          
        },
        error: (e) => {
          console.log(e.status);
          console.log(e.status);
            if(e.status==400){
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
            if(e.status==401){
              localStorage.clear();
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
        },
        complete: () => console.info('complete'),
        
      });
    }
  }

  playJodi() {
    console.log(this.playJodiForm);
    if(this.playJodiForm.digit == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Digit',
        icon: "error"
      });
    } else if(this.playJodiForm.price == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Price',
        icon: "error"
      });
    } else {
      this.GameService.playGameJodi(this.playJodiForm).subscribe({
        next: (v) => {
          console.log(v.data.insertedData);
          if(v.data.status == 'success'){
            if(v.data.insertedData){
              console.log(v.success);
              Swal.fire({
                title: "Success",
                text: v.data.msg,
                icon: "success"
              });
              this.playJodiForm.digit = '';
              this.playJodiForm.price = '';
              this.getBidLists();
              this.router.navigate(['/play-game/'+this.gameId]);
            }
          } else {
            Swal.fire({
              title: "Error",
              text: v.data.msg,
              icon: "error"
            });
          }
          
        },
        error: (e) => {
          console.log(e.status);
          console.log(e.status);
            if(e.status==400){
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
            if(e.status==401){
              localStorage.clear();
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
        },
        complete: () => console.info('complete'),
        
      });
    }
  }

  playCP() {
    console.log(this.playCPForm);
    if(this.playCPForm.digit == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Digit',
        icon: "error"
      });
    } else if(this.playCPForm.price == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Price',
        icon: "error"
      });
    } else {
      this.GameService.playGameCP(this.playCPForm).subscribe({
        next: (v) => {
          console.log(v.data.insertedData);
          if(v.data.status == 'success'){
            if(v.data.insertedData){
              console.log(v.success);
              Swal.fire({
                title: "Success",
                text: v.data.msg,
                icon: "success"
              });
              this.playCPForm.digit = '';
              this.playCPForm.price = '';
              this.showDigit = false;
              this.showCpPrice = false;
              this.getBidLists();
              this.router.navigate(['/play-game/'+this.gameId]);
            }
          } else {
            Swal.fire({
              title: "Error",
              text: v.data.msg,
              icon: "error"
            });
          }
          
        },
        error: (e) => {
          console.log(e.status);
          console.log(e.status);
            if(e.status==400){
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
            if(e.status==401){
              localStorage.clear();
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
        },
        complete: () => console.info('complete'),
        
      });
    }
    
    
  }

  showCPNos() {
    console.log(this.playCPForm);
    if(this.playCPForm.digit == '') {
      Swal.fire({
        title: "Error",
        text: 'Enter Digit',
        icon: "error"
      });
    } else {
      this.GameService.showCP(this.playCPForm).subscribe({
        next: (v) => {
          console.log(v.data.insertedData);
          if(v.data.status == 'success'){
            if(v.data.numbers){
              console.log('numbers', v.data.numbers);
              this.cpbidNos = v.data.numbers;
              this.showCpPrice = true;
              this.showDigitbtn = false;
              this.showDigit = true;
            }
          } else {
            Swal.fire({
              title: "Error",
              text: v.data.msg,
              icon: "error"
            });
          }
          
        },
        error: (e) => {
          console.log(e.status);
          console.log(e.status);
            if(e.status==400){
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
            if(e.status==401){
              localStorage.clear();
              this.error_msg = true;
              this.errorMsg = "Something went wrong";
            }
        },
        complete: () => console.info('complete'),
        
      });
    }
    
  }

  bidDelete(id: any, type: string) {
    this.deleteBidForm.bidid = id;
    this.deleteBidForm.play_type = type;
    console.log(this.deleteBidForm);
    
    this.GameService.bidDelete(this.deleteBidForm).subscribe({
      next: (v) => {
        if(v.data){
          console.log(v);
          Swal.fire({
            title: "Deleted",
            text: v.data.msg,
            icon: "error"
          });
          this.getBidLists();
        }
        
      },
      error: (e) => {
        console.log(e.status);
        console.log(e.status);
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Something went wrong";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Something went wrong";
          }
      },
      complete: () => console.info('complete'),
      
    });
  }

  playnow(type: string) {
    this.playnowForm.type = type;
    console.log(this.playnowForm);
    
    this.GameService.playnow(this.playnowForm).subscribe({
      next: (v) => {
        if(v.data.status == 'success'){
          console.log(v);
          Swal.fire({
            title: "Success",
            text: v.data.msg,
            icon: "success"
          });
          this.clearform();
          this.getBidLists();
        } else {
          Swal.fire({
            title: "Error",
            text: v.data.msg,
            icon: "error"
          });
        }
        
      },
      error: (e) => {
        console.log(e.status);
        console.log(e.status);
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Something went wrong";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Something went wrong";
          }
      },
      complete: () => console.info('complete'),
      
    });
  }

}
