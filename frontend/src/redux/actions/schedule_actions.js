import {
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_LIST_REQUEST,
} from 'redux/types/schedule_types';

// 스케줄 리스트
export const scheduleListAction = (data) => ({
  type: SCHEDULE_LIST_REQUEST,
  payload: data,
});

// 스케줄 삭제
export const scheduleDeleteAction = (scheduleId) => ({
  type: SCHEDULE_DELETE_REQUEST,
  payload: scheduleId,
});
