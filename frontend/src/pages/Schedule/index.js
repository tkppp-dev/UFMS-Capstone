import React, { useState } from 'react';
import { ScheduleContainer, Wrap } from './style';

import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import appointments from './demodata/today-appointments';

function Schedule() {
  const [scheduleData, setScheduleData] = useState({
    data: appointments,
    currentDate: new Date(),
    addedAppointment: {},
    appointmentChanges: {},
    editingAppointment: undefined,
  });

  const changeAddedAppointment = (addedAppointment) => {
    setScheduleData({ addedAppointment });
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    setScheduleData({ appointmentChanges });
  };

  const changeEditingAppointment = (editingAppointment) => {
    setScheduleData({ editingAppointment });
  };

  const commitChanges = ({ added, changed, deleted }) => {
    const { data } = scheduleData;

    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;

      setScheduleData({
        data: [...data, { id: startingAddedId, ...added }],
      });
    }
    if (changed) {
      setScheduleData({
        data: data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment,
        ),
      });
    }
    if (deleted !== undefined) {
      setScheduleData({
        data: data.filter((appointment) => appointment.id !== deleted),
      });
    }
  };

  return (
    <ScheduleContainer>
      {true ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderTop: '1px solid #dbdbdb',
            padding: '32px 64px',
          }}
        >
          <div
            style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
          >
            <Paper style={{ width: '100%', height: '100%' }}>
              <Scheduler data={scheduleData.data}>
                <ViewState currentDate={scheduleData.currentDate} />
                <EditingState
                  onCommitChanges={commitChanges.bind(commitChanges)}
                  addedAppointment={scheduleData.addedAppointment}
                  onAddedAppointmentChange={changeAddedAppointment.bind()}
                  appointmentChanges={scheduleData.appointmentChanges}
                  onAppointmentChangesChange={changeAppointmentChanges.bind()}
                  editingAppointment={scheduleData.editingAppointment}
                  onEditingAppointmentChange={changeEditingAppointment.bind()}
                />
                <WeekView startDayHour={9} endDayHour={17} />
                <AllDayPanel />

                <EditRecurrenceMenu />
                <ConfirmationDialog />

                <Appointments />
                <AppointmentTooltip showOpenButton showDeleteButton />
                <AppointmentForm />
              </Scheduler>
            </Paper>
          </div>
        </div>
      ) : (
        <Wrap>
          <div>로그인이 필요한 서비스입니다.</div>
        </Wrap>
      )}
    </ScheduleContainer>
  );
}

export default Schedule;
