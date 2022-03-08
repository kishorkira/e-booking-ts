<template>
  <b-container>
    <div class="event-details">
      <h1>{{ event.title }}</h1>
      <p>{{ event.date }}</p>
      <p>Tickets Available: {{ event.availableTickets }}</p>
    </div>
    <b-row class="booking-details">
      <b-col sm="12" md="6" class="box-1">
        <div
          class="img-container"
          :style="{ 'background-image': `url(${event.cover})` }"
        >
          <!-- <img :src="event.cover" alt="event.title" /> -->
        </div>
      </b-col>
      <b-col sm="12" md="6" class="box-2">
        <div class="booking-toast" v-if="showToast">
          <span>You have booked {{ count }} tickets</span>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <b-form-group id="input-group-name" label="Name:" label-for="name">
            </b-form-group>
            <ValidationProvider
              name="name"
              rules="required|name"
              v-slot="{ errors }"
            >
              <b-form-input
                id="name"
                v-model="form.name"
                placeholder="name"
              ></b-form-input>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>

            <b-form-group
              id="input-group-email"
              label="Email:"
              label-for="email"
            >
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors }"
              >
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                ></b-form-input>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>
            <b-form-group
              id="input-group-phone"
              label="Phone:"
              label-for="phone"
            >
              <ValidationProvider
                name="Phone no"
                rules="required|numeric|lengthRange:10,11"
                v-slot="{ errors }"
              >
                <b-form-input
                  id="phone"
                  v-model="form.phone"
                  type="text"
                  placeholder="Phone"
                ></b-form-input>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>

            <b-form-group
              id="input-group-seats"
              label="Number of seats:"
              label-for="input-seats"
            >
              <b-form-select
                plain
                id="input-seats"
                v-model="count"
                :options="seats"
              ></b-form-select>
            </b-form-group>
            <template v-for="n in count">
              <b-form-group
                :key="n"
                id="input-group-attendee"
                :label="`Name of Attendee ${n}`"
                :label-for="`attendee${n}`"
              >
                <ValidationProvider
                  :name="`Name of Attendee ${n}`"
                  rules="required|alpha"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    :id="`attendee${n}`"
                    v-model="form.attendees[n - 1]"
                    type="text"
                    :placeholder="`Name of Attendee ${n}`"
                  ></b-form-input>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </template>

            <div class="mt-2">
              <b-button
                class="me-3"
                type="submit"
                variant="outline-primary"
                :disabled="disableBtns"
                >Submit</b-button
              >
              <b-button
                @click="$emit('cancle-booking')"
                variant="outline-danger"
                :disabled="disableBtns"
                >Cancle</b-button
              >
            </div>
            
          </b-form>
        </ValidationObserver>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Event from "@/models/event";
import EventBookingDetails from "@/models/eventBookingDetails";

@Component<EventBooking>({
  watch: {
    count(value) {
      const attlen = this.form.attendees.length;
      if (value > attlen) {
        // eslint-disable-next-line no-unused-vars
        const addempty = [...Array(value - attlen)].map((_) => "");
        this.form.attendees = [...this.form.attendees, ...addempty];
      } else {
        this.form.attendees.splice(value);
      }
    },
  },
})
export default class EventBooking extends Vue {
  @Prop({ required: true })
  event!: Event;

  form: EventBookingDetails = {
    email: "",
    name: "",
    phone: "",
    attendees: [],
  };
  count = 1;
  showToast = false;
  disableBtns = false;
  onSubmit(): void {
    console.log(JSON.stringify(this.form));
    this.showToast = true;
    this.disableBtns = true;
    setTimeout(
      () => this.$emit("success-booking", this.event, this.count),
      1500
    );
  }
  get seats() {
    const seats =
      this.event.availableTickets >= 6 ? 6 : this.event.availableTickets;
    return [...Array(seats)].map((_, i) => i + 1);
  }
}
</script>

<style scoped>
.error {
  color: red;
}
.event-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 0.5em;
}
.booking-details {
  display: flex;
  border: 1px solid black;
  padding: 20px;
  border-radius: 5px;
  min-height: 70vh;
  position: relative;
}
.box-1 .img-container {
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 50%;
  max-width: 100%;
  max-height: 50%;
}
.booking-toast {
  background-color: green;
  color: #fff;
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px;
}
</style>