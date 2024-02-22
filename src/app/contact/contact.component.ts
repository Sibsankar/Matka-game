import { Component, OnInit } from '@angular/core';
import { RulesRegulationService } from '../services/rules-regulation.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private RulesRegulationService: RulesRegulationService) { }
  public settingsData:any;
  public contact_whatsapp='';
  public contact_phone='';
  ngOnInit(): void {
    this.getPageData();
  }

  getPageData(){
    this.RulesRegulationService.getRules().subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.pageData){          
        this.settingsData=v.data.pageData
        this.contact_phone = this.settingsData.contact_phone
        this.contact_whatsapp = this.settingsData.contact_whatsapp
        
        Swal.close();
        
        }
        
        
      },
      error: (e) => {        
        Swal.fire({
          title: "Oops..."+e.status,
          text: ' Something Went wrong',
          icon: "error"
        });
      },
      complete: () => console.info('complete'),
      
    });
  }

}
