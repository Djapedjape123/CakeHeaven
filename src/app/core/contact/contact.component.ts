import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';

import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  messages: Message = new Message();

  @Input() 
  user: User = new User();

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get message() {
    return this.form.get('message');
  }
  constructor(private service: CakeService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    this.service.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.messages.name = this.user.firstName + ' ' + this.user.lastName;
        this.messages.email = this.user.email;
        this.messages.message = this.messages.message;

        this.form.patchValue(this.messages);
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }
  onSend(): void {
    this.messages = new Message(this.form.value);
    this.service.postMessage(this.messages).subscribe((message: Message) => {
      this.router.navigate(['/home']);
    });
  }
}
