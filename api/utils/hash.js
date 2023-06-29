import brcypt from 'bcrypt';

/**
 *
 * @param {String} mdp
 */
export const hash = async (mdp) => {
  return await brcypt.hash(mdp, await brcypt.genSalt());
};

/**
 *
 * @param {String} from
 * @param {String} to
 */
export const compareHash = async (from, to) => {
  try {
    return await brcypt.compare(from, to);
  } catch (e) {
    console.log(e);
    return false;
  }
};
