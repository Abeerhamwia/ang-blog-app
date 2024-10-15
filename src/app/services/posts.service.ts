import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Updated to non-compat version
import { map } from 'rxjs/operators';
import { Firestore, doc, updateDoc, increment, collection, query, where, limit, orderBy, getDocs } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }

  loadData() { 
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  loadLatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  loadCategoryPosts(categoryId: any) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  loadOnePost(postId: any) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilar(catId: any) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', catId).limit(4)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  countViews(postId: any) {
    const postRef = this.afs.doc(`posts/${postId}`).ref;
    const viewCount = {
      views: increment(1)
    };

    updateDoc(postRef, viewCount).then(() => {
      console.log('View Count Updated ..!');
    });
  }
}
