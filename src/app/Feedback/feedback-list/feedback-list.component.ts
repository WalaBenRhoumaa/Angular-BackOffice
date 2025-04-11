import { Component } from '@angular/core';
import { Feedback } from 'src/app/Core/Models/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = []; // Stores filtered feedbacks
  successMessage: string = ''; // Declare success message
  errorMessage: string = ''; // Declare error message
  searchQuery: string = ''; // Stores the user's search input

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data.map(feedback => ({
          ...feedback,
          reacts: feedback.reacts || []  // Ensures reacts is always an array
        }));
        this.filteredFeedbacks = [...this.feedbacks]; // Initially, all feedbacks are shown
        console.log('Feedbacks:', this.feedbacks);
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
      }
    });
  }

  filterFeedbacks() {
    if (!this.searchQuery) {
      this.filteredFeedbacks = [...this.feedbacks]; // If no search query, show all feedbacks
      return;
    }
  
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    
    // Attempt to match search query against both the message and the formatted date
    this.filteredFeedbacks = this.feedbacks.filter(fb => {
      const fbDate = new Date(fb.date); // Convert date to Date object
      const formattedDate = fbDate.toLocaleDateString(); // Format date as a readable string
  
      // Check if feedback's message or formatted date contains the search query
      return fb.message.toLowerCase().includes(lowerCaseQuery) || 
             formattedDate.includes(lowerCaseQuery); // Compare with formatted date
    });
  }
  

  deleteFeedback(id: number | undefined) {
    if (id !== undefined) {
      this.feedbackService.deleteFeedback(id.toString()).subscribe({
        next: () => {
          // Remove feedback from the list after successful deletion
          this.feedbacks = this.feedbacks.filter(fb => fb.id !== id);
          this.successMessage = 'Feedback deleted successfully!'; // Set success message
          this.errorMessage = ''; // Clear any previous error message

          // Show success alert
          alert('Feedback deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting feedback:', err);
          this.errorMessage = 'Failed to delete feedback'; // Set error message
          this.successMessage = ''; // Clear any previous success message

          // Show error alert
          alert('Failed to delete feedback');
        }
      });
    }
  }
}
