import isEmpty from 'lodash/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

export const validateName = (name, isOptional = false) => {
  if (isEmpty(name) && !isOptional) {
    return 'El campo "nombre" no puede estar vacío';
  }
  return '';
};

export const validateType = (type, isOptional = false) => {
  if (isEmpty(type) && !isOptional) {
    return 'Tipo de negocio es requerido';
  }
  return '';
};

export const validateEmail = (email, isOptional = false) => {
  if (isEmpty(email) && !isOptional) {
    return 'El campo "email" no puede estar vacío';
  }
  if (!isEmail(email)) {
    return 'Email invalido';
  }
  return '';
};

export const validateAddress = (address, isOptional = false) => {
  if (isEmpty(address) && !isOptional) {
    return 'Campo "dirección" no puede estar vacío';
  }
  return '';
};

export const validatePassword = (password, isOptional = false) => {
  if (isEmpty(password) && !isOptional) {
    return 'Campo contraseña es requerido';
  }
  if (!isLength(password, {min: 6, max: undefined})) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword, isOptional = false) => {
  if (isEmpty(confirmPassword) && !isOptional) {
    return 'Confirmación de contraseña es requerida';
  }
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }
  return '';
};

export const validateCodeArpi = (code, isOptional = false) => {
  if (isEmpty(code) && !isOptional) {
    return 'El código es requerido';
  }
  if (!isLength(code, {min: 8, max: 8})) {
    return 'El código dedbe tener al menos 8 caracteres';
  }
  return '';
};

export const validateRuc = (code, isOptional = false) => {
  if (isEmpty(code) && !isOptional) {
    return 'El RUC es requerido';
  }
  if (!isLength(code, {min: 13, max: 13})) {
    return 'El RUC debe tener al menos 13 caracteres';
  }
  return '';
};

export const validatePhone = (phone, isOptional = false) => {
  if (isEmpty(phone) && !isOptional) {
    return 'El campo "teléfono" no puede estar vacío';
  }
  const regex = /^(\+593|0)([2-7]|9[2-9])\d{7}$/;
  if(regex.test(phone)){
    return ''
  }
  return 'El número telefónico es invalido';
};

