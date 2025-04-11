import { Component } from '@angular/core';
import { Feedback } from 'src/app/Core/Models/feedback';
import { Reacts } from 'src/app/Core/Models/reacts';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {
  feedback: Feedback = {
    message: '',
    date: '',
    item: { id: 1 }, // or dynamically chosen
    reacts: [
      {
        reaction: 'LIKE'
      } as Reacts
    ]
  };

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback() {
    this.feedback.date = new Date().toISOString(); // Set current date/time

    this.feedbackService.addFeedback(this.feedback).subscribe({
      next: (res) => {
        alert('Feedback envoyé avec succès !');
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'envoi du feedback.');
      }
    });
  }
}