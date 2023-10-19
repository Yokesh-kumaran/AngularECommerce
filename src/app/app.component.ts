import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'AngularECommerce';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.loadUsers();
  }
}
