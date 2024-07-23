<script setup></script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div
              class="d-flex align-items-center justify-content-between breadcrumb-content"
            >
              <h5>Calender</h5>
              <div>
                <a
                  href="#"
                  class="btn btn-primary"
                  data-target="#new-create-modal"
                  data-toggle="modal"
                  >Create New</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <div class="card card-block card-stretch card-height">
          <div class="card-header d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <h5 class="mr-3">20 Nov, Friday</h5>
              <div class="mt-1">
                <a href="#" id="cal-prev" class="text-dark mr-2 font-size-18"
                  ><i class="las la-chevron-circle-left m-0"></i
                ></a>
                <a href="#" id="cal-next" class="text-dark font-size-18"
                  ><i class="las la-chevron-circle-right m-0"></i
                ></a>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <select
                name="cal_type"
                class="selectpicker calender-select"
                id="cal-type"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
              <a href="#" class="btn btn-primary btn-new"
                ><i class="ri-add-line"></i>New</a
              >
            </div>
          </div>
          <div class="card-body">
            <div id="calendar" style="height: 640px"></div>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="card card-block card-stretch card-height">
          <div class="card-body">
            <div class="card border-bottom">
              <div class="card-body text-center inln-date flet-datepickr">
                <input
                  type="text"
                  id="inline-date"
                  class="date-input basicFlatpickr d-none"
                  readonly="readonly"
                />
              </div>
            </div>
            <div class="card card-list">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <svg
                    class="svg-icon text-secondary mr-3"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    ></path>
                  </svg>
                  <div class="pl-3 border-left">
                    <h5>Direct Development</h5>
                    <p class="mb-0">Unveling the design system</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card card-list">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <svg
                    class="svg-icon text-primary mr-3"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline
                      points="22 12 16 12 14 15 10 15 8 12 2 12"
                    ></polyline>
                    <path
                      d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                    ></path>
                  </svg>
                  <div class="pl-3 border-left">
                    <h5>action point assigned</h5>
                    <p class="mb-0">Unveling the design system</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card card-list mb-0">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <svg
                    class="svg-icon text-warning mr-3"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    ></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div class="pl-3 border-left">
                    <h5>Private Notes</h5>
                    <p class="mb-0">Unveling the design system</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page end  -->
  </div>
</template>
