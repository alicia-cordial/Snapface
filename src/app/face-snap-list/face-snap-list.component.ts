import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps!: FaceSnap[]; 
  private destroy$!: Subject<boolean>;

  constructor(private faceSnapsService: FaceSnapService) { }

  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps = this.faceSnapsService.getAllFaceSnaps() ;
    // exemple fuite de mémoire
    interval(1000).pipe(
      // take(4), prend nombre d'émissions take et permet arrêt observable 
      // tap(value => console.log(value)) même chose, raccourcit 
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe();
   
  }

  ngOnDestroy(): void {
    //permet destruction observable
    this.destroy$.next(true);
  }

}
