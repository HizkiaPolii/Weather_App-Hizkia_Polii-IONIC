import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
} from "@ionic/react";
import Weather from "../components/Weather";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Weather App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Weather />
      </IonContent>
      <IonFooter>
        <IonTitle>Weather App</IonTitle>
        <p>By Hizkia Polii</p>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
