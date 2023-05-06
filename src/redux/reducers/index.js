import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import interestSkillReducer from './interestSkillReducer';
import spiritAnimalReducer from './spiritAnimalReducer';
import userDashboardReducer from './userDashboardReducer';
import hhhReducer from './hhhReducer';
import careerReducer from './careerReducer';
import passwordRecoverReducer from './passwordRecoverReducer';
import childReducer from './childReducer';
import reportingReducer from './reportingReducer';
import passportReducer from './passportReducer';
import subscriptionReducer from './subscriptionReducer';
import learningHubReducer from './learningHubReducer';
import { SET_INITIAL_STATE_ON_LOGOUT } from '../constants/constants';

import counsellerProfileReducer from './counsellerProfileReducer';
import counsellerSessionAvailabilityReducer from './sessionScheduleReducer';
import messageReducer from './messageReducers';
import liveSchedulingReducer from './liveSchedulingReducers';
import userScheduledSessionReducer from './userScheduledSessionReducer';
import accountActivationReducer from './accountActivationReducer';

import lcUpcomingSessionsReducer from './lcUpcomingSessionsReducer';
import lcLearnersSessionsReducer from './lcLearnerSessionsReducer';
import lcLearnersListingReducer from './lcLearnersReducer';
import actionPlanReducer from './actionPlanReducer';
import updatePaymentDetailsReducer from './updatePaymentReducer';
import LCDashboardReducer from './LCDashboardReducer';
import paymentDetailsReducer from './paymentDetailsReducer';
import { childsProfileSettingReducer, getchildsProfileSettingReducer } from './childsProfileSettingReducer';

import {taskCountReducer, tasksReducer} from './taskReducer';
import sessionCancellationReasonReducer from './sessionCancellationReasonReducer';
import counsellorTermsReducer from './counsellorsTermsReducer';
import lcScheduleCountReducer from './LCScheduleCountReducer';
import ignitorSessionReportReducer from './ignitorSessionReportReducer';
import counsellorProfileTypeReducer from './counsellorProfileTypeReducer';
import sessionDataReducer from './sessionDataReducer';
import stateReducer from './stateReducer';
import TestResultReducer from './TestResultReducer';
import documentOptionReducer from './documentOptionReducer';
import upcomingSessionRecordReducer from './upcomingSessionRecordReducer';
import saveCounsellorDataReducer from './saveCounsellorDataReducer';
import TrainingMenuReducer from './TrainingMenuReducer';
import getDocumentsReducer from './getDocumentsReducer';
import getSessionDetailsReducer from './SessionDetailsReducer';
import previousCounsellorReducer from './previousCounsellorReducer';
import getSessionWorkingHoursReducer from './SessionWorkingHoursReducer';
import commercialPricingReducer from './commercialPricingReducer';
import getSessionLogsReducer from './SessionLogsReducer';
import previousCounsellorAvailablityReducer from './previousCounsellorAvailabilityReducer';
import getLearnerDataReducer from './learnerDataReducer';
import learnerAllActionPlanReducer from './learnerAllActionPlanReducer';
import counsellorRatingReducer from './counsellorRatingReducer';
import cspReducer from './cspReducer';
import industriesListReducer from './industriesListReducer';
import careerListReducer from './getCareerReducer';
import planListReducer from './planListReducer';
import courseListReducer from './courseListReducer';
import collegesReducer from './collegesReducer';
import studyAbroadReducer  from './studyAbroadReducer';
import collegeCourseReducer from './collegeCourseReducer';
import allCollegesReducer from './allCollegesReducer';
import csmpReducer from './csmpReducer';
import citiesReducer from './citiesReducer';
import resumeBuilderReducer from './resumeBuilderReducer';
import learnerAnalyticsReducer from './learnerAnalyticsReducer';
import csmpSessionAnalyticsReducer from './csmpSessionAnalyticsReducer';
import userPersonalityQuizAnalyticsReducer from "./userPersonalityQuizAnalyticsReducer";
import userAccountReducer from "./acountReducer";
import getUserChildReducer from "./acountReducer";
import userPremiumReducer from './userPremiumReducer';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  quiz: quizReducer,
  interest: interestSkillReducer,
  spirit: spiritAnimalReducer,
  dashboard: userDashboardReducer,
  hhh: hhhReducer,
  career: careerReducer,
  password: passwordRecoverReducer,
  child: childReducer,
  reporting: reportingReducer,
  passport: passportReducer,
  subscription: subscriptionReducer,
  message: messageReducer,
  accountActivationStatus: accountActivationReducer,
  counselerProfile: counsellerProfileReducer,
  liveScheduling: liveSchedulingReducer,
  sessionSchedue: counsellerSessionAvailabilityReducer,
  userScheduedSession: userScheduledSessionReducer,
  lcLearnersSessions: lcLearnersSessionsReducer,
  lcDashboard: LCDashboardReducer,
  lcUpcomingSessions: lcUpcomingSessionsReducer,
  actionPlan: actionPlanReducer,
  paymentDetails: paymentDetailsReducer,
  updatePaymentDetails: updatePaymentDetailsReducer,
  downloadPdf: paymentDetailsReducer,
  lcDashboard: LCDashboardReducer,
  lcLearnersListing: lcLearnersListingReducer,
  childRights: childsProfileSettingReducer,
  getChildRights: getchildsProfileSettingReducer,
  tasks: tasksReducer,
  cancellation: sessionCancellationReasonReducer,
  agreements: counsellorTermsReducer,
  lcScheduleCount: lcScheduleCountReducer,
  ignitorSessionReport: ignitorSessionReportReducer,
  counsellorProfileType: counsellorProfileTypeReducer,
  sessionData: sessionDataReducer,
  learningHub: learningHubReducer,
  states: stateReducer,
  upcomingSessionRecord: upcomingSessionRecordReducer,
  counsellorData: saveCounsellorDataReducer,
  testResult: TestResultReducer,
  documentOption: documentOptionReducer,
  upcomingSessionRecord: upcomingSessionRecordReducer,
  counsellorData: saveCounsellorDataReducer,
  trainingMenu: TrainingMenuReducer,
  counsellorDocuments: getDocumentsReducer,
  sessionDetails: getSessionDetailsReducer,
  previousCounsellorDetails: previousCounsellorReducer,
  sessionWorkingHours: getSessionWorkingHoursReducer,
  commercialPricing: commercialPricingReducer,
  sessionLogs: getSessionLogsReducer,
  previousCounsellorAvailablity: previousCounsellorAvailablityReducer,
  taskCount: taskCountReducer,
  learnerData: getLearnerDataReducer,
  learnerAllActionPlan: learnerAllActionPlanReducer,
  counsellorRating: counsellorRatingReducer,
  CSP: cspReducer,
  industriesList : industriesListReducer,
  careerList : careerListReducer,
  planList : planListReducer,
  courseList : courseListReducer,
  colleges: collegesReducer,
  studyAbroadReducer: studyAbroadReducer,
  collegeCourses: collegeCourseReducer,
  allColleges: allCollegesReducer,
  CSMP: csmpReducer,
  cities: citiesReducer,
  resumeBuilder: resumeBuilderReducer,
  learnerAnalytics: learnerAnalyticsReducer,
  csmpSessionAnalytics: csmpSessionAnalyticsReducer,
  userPersonalityQuizAnalytics: userPersonalityQuizAnalyticsReducer,
  userAccount: userAccountReducer,
  getUserChildDetailsList: getUserChildReducer,
  getUserPremium:userPremiumReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SET_INITIAL_STATE_ON_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
