const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_key'
  : 'pk_test_key';

export default STRIPE_PUBLISHABLE