const secret = process.env.JWT_SECRET;

if (!secret) {
  throw 'Missing ENV variable "JWT_SECRET"';
}

export default String(secret);
