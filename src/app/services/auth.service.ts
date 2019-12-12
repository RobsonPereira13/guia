import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
    ) {
    this.userCollection = this.afs.collection<User>('Guias');
     }

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }

  getUsers() {
    return this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
 
  getUser(id: string) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateUser(id: string, guia: User) {
    return this.userCollection.doc<User>(id).update(guia);
  }

  deleteProduct(id: string) {
    return this.userCollection.doc(id).delete();
  }

  forgotPasswordUser(email: string){
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  updatePassword(newpassword: string){
    return this.afa.auth.currentUser.updatePassword(newpassword);
  }
}