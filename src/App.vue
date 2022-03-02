<template>
  <div id="app">
    <MainNavigation />
    <EventsList :events="events" v-if="!isBooking" @book-event="bookEvent" />
    <EventBooking
      :event="event"
      v-else
      @cancle-booking="isBooking = false"
      @success-booking="onBooked"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainNavigation from "@/components/MainNavigation.vue";
import EventsList from "@/components/EventsList.vue";
import EventBooking from "@/components/EventBooking.vue";
import eventsData from "@/assets/events";
import Event from "@/models/event";

@Component({
  components: {
    MainNavigation,
    EventsList,
    EventBooking,
  },
})
export default class App extends Vue {
  events: Event[] = eventsData;
  isBooking: boolean = false;
  event: Event = {
    id: "",
    availableTickets: 0,
    title: "",
    date: "",
    cover: "",
  };
  bookEvent(event: Event) {
    this.event = event;
    this.isBooking = true;
  }
  onBooked(event: Event, count: number) {
    const eventIndex = this.events.findIndex((e) => e.id === event.id);
    if (eventIndex !== -1) {
      const evt = this.events[eventIndex];
      this.events.splice(eventIndex, 1, {
        ...evt,
        availableTickets: evt.availableTickets - count,
      });
    }
    this.isBooking = false;
  }
}
</script>

<style>
</style>
