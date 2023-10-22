import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onBoardingForm!: FormGroup;
  workspaceForm!: FormGroup;
  showLogin: boolean = true;
  step: number = 1;
  userList: Array<object> = [];
  currentUser: any = {};
  selectedCard: any = null;
  formSubmitted: boolean = false;
  activeForm: string = '';

  //card data
  cardList = [
    {
      title: 'For myself',
      description: 'Write better. Think more clearly. Stay organized.',
      icon: 'bi bi-person-fill'
    },
    {
      title: 'With my team',
      description: 'Wikis, docs, tasks & projects, all in one place.',
      icon: 'bi bi-people-fill'
    },
  ];

  constructor(private fb: FormBuilder) {}
  ngOnInit(){
    //step 2 form
    this.onBoardingForm = this.fb.group({
      firstName: ['', Validators.required],
      displayName: ['', Validators.required],
      
    });

    //step 3 form
    this.workspaceForm = this.fb.group({
      workspaceName: ['', Validators.required],
      workspaceURL: ['']
    });
  }

  //hide welcome content
  navigateToLogin() {
    this.showLogin = false;
    this.step = 1;
  }

  // after complete go to welcome page.
  startAgain(){
    this.showLogin = true;
  }

  //onboard navigatetion, from step 1 to 4.
  goToNextStep(newStep: number) {
    console.log('this.formSubmitted', this.formSubmitted)
    this.formSubmitted = true;
    this.onBoardingForm.markAllAsTouched();
    const formToSubmit = this.activeForm === 'onBoardingForm' ? this.onBoardingForm : this.workspaceForm;
   if (formToSubmit.valid || newStep > 3) {
      if(newStep == 2 ) {
        this.currentUser['firstName'] = this.onBoardingForm.get('firstName')?.value;
        this.currentUser['displayName'] = this.onBoardingForm.get('displayName')?.value;
      } else if(newStep == 3 ) {
        this.currentUser['workspaceName'] = this.workspaceForm.get('workspaceName')?.value;
        this.currentUser['workspaceURL'] = this.workspaceForm.get('workspaceURL')?.value;
      }
      this.step = newStep;
      const specialElement = document.getElementById(`step-${newStep}`);
      // Add a class active-step-number to the element to current step
      specialElement?.classList.add('active-step-number');

      //add connecting line active-connecting-line
      const connectingLineElement = document.getElementsByClassName(`line-${newStep}`);
      for (let i = 0; i < connectingLineElement.length; i++) {
        const element = connectingLineElement[i];
        element.classList.add('active-connecting-line');
      }
      formToSubmit.reset();
      this.formSubmitted = false;
      console.log(' this.currentUser',  this.currentUser)
    } else{
      console.log('Form validation errors:', formToSubmit.errors);
    }
  }


  selectCard(event:any): void {
    //console.log(event)
    // card selection
    const cardElement = (event.target as HTMLElement).closest('.card');
    
    if (cardElement) {
      // Remove the previously selected card
      const previousSelectedCard = document.querySelector('.selected-card');
      if (previousSelectedCard) {
        previousSelectedCard.classList.remove('selected-card');
      }
      // Add the "selected-card" class to the newly selected card
      console.log('cardElement', cardElement.id)
      this.currentUser['Card'] = cardElement.id =="card-1" ? this.cardList[0] : this.cardList[1]
      cardElement.classList.add('selected-card');
      //console.log('this.currentUser', this.currentUser)
    }
  }
}
