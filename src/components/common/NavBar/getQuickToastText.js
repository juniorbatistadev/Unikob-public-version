import {
  FOLLOW_NOTIFICATION,
  GIFT_NOTIFICATION,
  POST_COMMENT_NOTIFICATION,
  POST_LIKE_NOTIFICATION,
  PROFILE_COMMENT_NOTIFICATION,
  RESPONSE_COMMENT_NOTIFICATION,
} from "src/notificationsTypes";

const getQuickToastText = (type) => {
  let text = "Recibiste una notification";

  if (type === PROFILE_COMMENT_NOTIFICATION) {
    text = "Recibiste un comentario en tu perfil";
  }

  if (type === POST_COMMENT_NOTIFICATION) {
    text = "Recibiste un comentario en tu publicacion";
  }

  if (type === RESPONSE_COMMENT_NOTIFICATION) {
    text = "Recibiste una respuesta a tu comentario";
  }

  if (type === POST_LIKE_NOTIFICATION) {
    text = "A alguien le gusto tu publicacion";
  }

  if (type === GIFT_NOTIFICATION) {
    text = "Recibiste un regalo";
  }

  if (type === FOLLOW_NOTIFICATION) {
    text = "Alguien te empezo a seguir";
  }

  return text;
};

export default getQuickToastText;
