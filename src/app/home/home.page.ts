import {Component, inject, OnInit, viewChild, ViewChild} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonList,
  IonAvatar, IonImg, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import {DataService} from "../services/data.service";
import {Result, Root} from "../common/interface";
import {ToastService} from "../services/toast.service";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";
import {idCard} from "ionicons/icons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonAvatar, IonImg, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class HomePage implements OnInit{
@ViewChild('lista',{static:false}) lista!: IonList;
@ViewChild(IonInfiniteScroll) infinite!: IonInfiniteScroll;
  private readonly toastService: ToastService = inject(ToastService);
  private dataservice: DataService = inject(DataService);
  private loadingCtrl: LoadingController = inject(LoadingController);
  componentes: Result[] = [];
  currentPage = 1;
  constructor() {}

  ngOnInit(): void {
    this.cargarComponentes();
  }

  private async cargarComponentes(event?: InfiniteScrollCustomEvent){

    const loading = await this.loadingCtrl.create({
      message: 'cargando...',
      spinner: 'bubbles'
    });
    await loading.present();

  this.dataservice.getRicky().subscribe(
    {
      next:value => {
        loading.dismiss();
        this.componentes.push(...value.results);
        event?.target.complete();

      },
      error: (err: Error) => console.log(err),
      complete: () => {
        console.log('data loaded')}
    }
    );
  }

  eliminarItem(i: Result) {
    this.toastService.mostrarToast(i.name + ' lo has eliminado','danger')
    this.lista.closeSlidingItems();
  }
  addItem(i: Result) {
    this.toastService.mostrarToast(i.name + ' lo has incluido','primary')
    this.lista.closeSlidingItems();
  }

  loadMore(event: any) {
    this.cargarComponentes(event);
    }
}
