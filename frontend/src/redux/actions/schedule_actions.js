import {
  NOTICE_REQUEST,
  SCHEDULE_ADD_REQUEST,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_NEXT_REQUEST,
  SCHEDULE_NOW_REQUEST,
  SCHEDULE_REQUEST,
  SEARCH_SUBJECT_REQUEST,
} from 'redux/types/schedule_types';

// 스케줄 리스트
export const scheduleListAction = (id) => ({
  type: SCHEDULE_LIST_REQUEST,
  payload: id,
});

export const scheduleAction = (data) => ({
  type: SCHEDULE_REQUEST,
  payload: data,
});

// 스케줄 추가
export const addScheduleAction = (data) => ({
  type: SCHEDULE_ADD_REQUEST,
  payload: data,
});

// 스케줄 삭제
export const scheduleDeleteAction = (scheduleId) => ({
  type: SCHEDULE_DELETE_REQUEST,
  payload: scheduleId,
});

// now schedule
export const scheduleNowAction = (id) => ({
  type: SCHEDULE_NOW_REQUEST,
  payload: id,
});

// next schedule
export const scheduleNextAction = (id) => ({
  type: SCHEDULE_NEXT_REQUEST,
  payload: id,
});

// Search Subject
export const searchSubjectAction = (data) => ({
  type: SEARCH_SUBJECT_REQUEST,
  payload: data,
});

// 공지
export const noticeAction = (id) => ({
  type: NOTICE_REQUEST,
  payload: id,
});
