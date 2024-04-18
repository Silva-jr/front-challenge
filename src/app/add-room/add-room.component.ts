import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { RoomMock } from '../config/mock/room';
import { RoomService } from '../config/security/room.service';
import { NgForm } from '@angular/forms';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {
  rooms: RoomMock[] = [];
  newRoom: RoomMock = {
    id: 0,
    description: '',
    functional: 0,
    nonFunctional: 0,
    total: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }

  addRoom(form: NgForm): void {
    if (form.valid) {
      this.roomService.addRooms(this.newRoom).subscribe((novaTarefa) => {
        this.rooms.push(novaTarefa);
        this.newRoom = {
          id: 0,
          description: '',
          functional: 0,
          nonFunctional: 0,
          total: 0,
        };
        this.closeModal();
      });
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
