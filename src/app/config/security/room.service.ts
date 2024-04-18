import { Injectable } from '@angular/core';
import { RoomMock } from '../mock/room';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private url = 'assets/room.json';

  private rooms: RoomMock[] = [];

  constructor(private http: HttpClient) {}

  private saveRooms(rooms: RoomMock[]): void {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }


  getRoomsLocalStorage(): RoomMock[]{
    const roomsStr = localStorage.getItem('rooms');
    return roomsStr ? JSON.parse(roomsStr) : [];
  }

  getRoomsFromJson(): Observable<RoomMock[]> {
    return this.http.get<RoomMock[]>(this.url).pipe(
      tap((rooms) => (this.saveRooms(rooms))),
      catchError(this.handleError<RoomMock[]>('getRooms', []))
    );
  }

  getRooms(): Observable<RoomMock[]>{
    const localRooms = this.getRoomsLocalStorage();
    if (localRooms.length > 0){
      return of(localRooms);
    }else{
      return this.getRoomsFromJson();
    }
  }

  addRooms(newRoom: RoomMock): Observable<RoomMock> {
    const room = this.getRoomsLocalStorage();
    newRoom.id = this.generateId();
    room.push(newRoom);
    this.saveRooms(room)
    console.log(room);
    return of(newRoom);
  }

  editRoom(editedRoom: RoomMock): Observable<RoomMock> {
    const index = this.rooms.findIndex(room => room.id === editedRoom.id);
    if (index !== -1) {
      this.rooms[index] = editedRoom; 
      return of(editedRoom); 
    } else {
     
      return throwError('Tarefa não encontrada');
    }
  }

  deleteRoom(roomId: number): Observable<void> {
    const index = this.rooms.findIndex(room => room.id === roomId);
    if (index !== -1) {
      this.rooms.splice(index, 1); 
      return of(); 
    } else {
    
      return throwError('Tarefa não encontrada');
    }
  }


  private generateId(): number {
    return this.rooms.length > 0
      ? Math.max(...this.rooms.map((room) => room.id)) + 1
      : 1;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
