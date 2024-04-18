import { Component, OnInit } from '@angular/core';
import { RoomService } from '../config/security/room.service';
import { RoomMock } from '../config/mock/room';
import { MatDialog } from '@angular/material/dialog';
import { AddRoomComponent } from '../add-room/add-room.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rooms: RoomMock[] = [];
  isAdmin: boolean = false;

  constructor(private roomService: RoomService, public dialog: MatDialog) {
    const aux = localStorage.getItem('cargo');
    this.isAdmin = aux? JSON.parse(aux): false;
  }

  ngOnInit() {
    this.getRoom();
    this.updateRoom();
  }

  getRoom() {
    this.roomService.getRooms().subscribe((resp: RoomMock[]) => {
      this.rooms = resp;
      console.log(this.rooms);
    });
  }

  updateRoom() {
    this.rooms.forEach((room) => {
      room.total = room.functional + room.nonFunctional;
    });
  }

  exibirBotaoAtualizar(): boolean {
    for (const room of this.rooms) {
      if (room.functional < 0 || room.nonFunctional < 0) {
        return true;
      }
    }
    return false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '35%',
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      position: {
        top: '50vh',
        left: '50vw',
      },
      panelClass: 'makeItMiddle',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoom();
    });
  }
}
