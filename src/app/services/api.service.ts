import { EventEmitter, inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

export interface Program {
  id: string;
  title: string;
  src: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  programsDesactived = new EventEmitter();
  programs = new EventEmitter();
  document = 'programs';
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  async getProgramsDesactive() {
    const coll = query(
      collection(this.firestore, this.document),
      where('active', '==', false)
    );

    const querySnapshot = await getDocs(coll);
    let results: any = [];

    await querySnapshot.docs.map((doc: any) =>
      results.push({ id: doc.id, ...doc.data() })
    );

    await this.programsDesactived.emit(results);
  }

  async getProgramsByActive() {
    const coll = query(collection(this.firestore, this.document));

    const querySnapshot = await getDocs(coll);
    let results: any = [];

    await querySnapshot.docs.map((doc: any) =>
      results.push({ id: doc.id, ...doc.data() })
    );

    await this.programs.emit(
      results.sort((a: any) => {
        return a.active ? -1 : 1;
      })
    );
  }

  setActiveProgram(id: string, active: boolean) {
    updateDoc(doc(this.firestore, this.document, id), { active }).then(() => {
      this.getProgramsDesactive();
      this.getProgramsByActive();
    });
  }
}
