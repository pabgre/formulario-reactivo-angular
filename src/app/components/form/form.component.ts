import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { User } from '../../interfaces/User'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  userForm : FormGroup;

  @Output() onUserSubmit: EventEmitter<User> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      firstName: formBuilder.control('', [Validators.required, Validators.minLength(3), this.beginsWithUpper]),
      surname: formBuilder.control('', [Validators.required, Validators.minLength(3), this.beginsWithUpper]),
      username: formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), this.validUser]),
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [Validators.required, this.strongPassword, Validators.minLength(8)]),
      passwordCopy: formBuilder.control('', [Validators.required])

    },{
      validators: [this.validPassword]
    });
  }

   public onSubmit(){
     // password encryption?
     const userData : User = {
       firstName: this.control('firstName')?.value,
       surname: this.control('surname')?.value,
       username: this.control('username')?.value,
       email: this.control('email')?.value,
       password: this.control('password')?.value,
     }

     this.onUserSubmit.emit(userData);
     this.userForm.reset();
   }

   public control(name: string){
     return this.userForm.get(name);
   }

   private strongPassword(control: AbstractControl): ValidationErrors | null{

      let hasNumber = /\d/.test(control.value);
      let hasUpper = /[A-Z]/.test(control.value);
      let hasLower = /[a-z]/.test(control.value);

      let valid = hasNumber && hasUpper && hasLower;
      if (!valid) {
        return { noNumber: !hasNumber, noUpper: !hasUpper, noLower: !hasLower };
      }


      return null
   }

   private beginsWithUpper(control: AbstractControl): ValidationErrors | null{

     if (control.value && /[a-z]/.test((control.value).charAt(0))){
       return {firstUpper: true}
     }

     return null
   }


   private validUser(control: AbstractControl): ValidationErrors | null{
     // check if user exist in db?

     if(control.value && control.value.includes(" ")){
       return {whiteSpace: true}
     }
     return null
   }

   private validPassword(control: AbstractControl): ValidationErrors | null{
     const password = control.get('password')?.value;
     const passwordCopy = control.get('passwordCopy')?.value;

     if (password !== passwordCopy){
            return { notSamePassword: true};
     }
     return null
   }

  ngOnInit(): void {
  }

}
