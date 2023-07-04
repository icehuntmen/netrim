import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateFirebaseDto } from './dto/create-firebase.dto';
import { UpdateFirebaseDto } from './dto/update-firebase.dto';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class FirebaseService {
  private database: FirebaseFirestore.Firestore;

  constructor(
    private config: ConfigService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin
  ) {
    this.database = firebase.firestore;
  }

  async exampleMethod() {
    // const firestore = await this.getFirestore();
    // const collectionRef = await firestore.collection('members');
    // // Обработка операций с базой данных...
    //
    // collectionRef.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     // Доступ к данным каждого документа
    //     console.log(doc.id, doc.data());
    //   });
    // }).catch((error) => {
    //   console.log("Ошибка при получении данных из коллекции:", error);
    // });
    //console.dir(collectionRef,{ depth: 10})

    const collectionRef = this.database.collection('members');
    const snapshot = await collectionRef.get();
    //console.dir(snapshot, { depth: 10 });
    return snapshot.docs.map((doc) => doc.data());
  }

  async addData(data: any): Promise<string> {
    const collectionRef = this.database.collection('members');
    try {
      const docRef = await collectionRef.add(data);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      return null;
    }
  }

  create(createFirebaseDto: CreateFirebaseDto) {
    return 'This action adds a new firebase';
  }

  findAll() {
    return `This action returns all firebase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} firebase`;
  }

  update(id: number, updateFirebaseDto: UpdateFirebaseDto) {
    return `This action updates a #${id} firebase`;
  }

  remove(id: number) {
    return `This action removes a #${id} firebase`;
  }
}
