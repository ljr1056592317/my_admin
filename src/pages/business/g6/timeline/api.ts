// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/zzlt/api/zzlt/v2/supply-chain/personal_graph/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getTimeLineApi() {
  return request<API.FakeCaptcha>('/zzlt/api/zzlt/v2/supply-chain/personal_graph/list', {
    method: 'GET',
    data: {},
  });
}
