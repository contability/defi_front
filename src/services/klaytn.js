export const requesttransaction = async (jreqdata) => {
  let { from, to, data, value } = jreqdata;
  let { klaytn } = window;
  const txparams = {
    from: from,
    to: to,
    data: data,
    value: value, // '0x00'
  };
  let resp;
  try {
    resp = await klaytn.request({
      method: "eth_sendTransaction",
      params: [txparams],
    });
    return resp;
  } catch (err) {
    return null;
  }
};
