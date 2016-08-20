/* API/AUTH */
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error'

/* API/LEARNER */
export const LEARNER_PREFERENCES = 'learner_preferences';
export const CURRENT_MENTOR = 'current_mentor';
export const CLEAR_MENTOR = 'clear_mentor';

/* MENTORS */
export const MENTOR_FETCH_REVIEWS = 'mentor_fetch_reviews';

/* API/REVIEWS */
export const SUBMIT_REVIEW = 'submit_review';
export const CURRENT_MENTOR_REVIEWS = 'current_mentor_reviews';
export const CLEAR_MENTOR_REVIEWS = 'current_mentor_reviews';

/* API/FILTER */
export const CHANGE_PREFS = 'change_prefs';
export const MODIFIED_MENTORS = 'filtered_mentors_list';
export const SEARCHABLE_MENTORS = 'searchable_mentors_list';

/* LOADERS  */
export const LOADING_MENTOR_COMPLETE = 'loading_mentor_complete';
export const LOADING_MENTOR = 'loading_mentor';
export const LOADING_LEARNER_DASHBOARD = 'loading_learner_dashboad';
export const LOADING_LEARNER_DASHBOARD_COMPLETE = 'loading_learner_dashboad_complete';

/* API/CALENDAR*/
export const SELECTED_APPOINTMENT = 'selected_appointment';
export const SELECTED_SLOT = 'selected_slot';
export const CREATE_APPOINTMENT = 'create_appoinment';
export const FETCH_APPOINTMENTS = 'fetch_appointments';
export const UPDATE_APPOINTMENT = 'update_appointment';
export const DELETE_APPOINTMENT = 'delete_appointment';


/* VIDEO CHAT  */
export const GET_VIDEO_TOKEN = 'get_video_token';

/* CHAT */
export const LOADING_MESSAGES = 'loading_messages';
export const LOADING_MESSAGES_COMPLETE = 'loading_messages_complete';
export const USER_CONVERSATIONS = 'user_conversations';
export const CONVERSATION_MESSAGES = 'conversation_messages';
export const POST_MESSAGE = 'post_message';
export const CLEAR_MESSAGES = 'clear_messages';
export const SAVE_MESSAGE = 'save_message';
export const RECIEVE_SOCKET = 'recieve_socket';
export const CURRENT_CONVERSATION = 'current_conversation';
export const OPEN_CHAT_BOX = 'open_chat_box';
export const CLOSE_CHAT_BOX = 'close_chat_box';
export const ADD_NOTIFICATION = 'add_notification';
export const REMOVE_NOTIFICATION = 'remove_notification';
export const MARK_AS_READ = 'mark_as_read';
