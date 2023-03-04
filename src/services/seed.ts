import { APIShirtProps } from 'src/types';
import { Http } from 'src/utils';
import { dispatch, shirts } from 'src/redux';
import { normalizeResponse } from './__utils';

export const fetchShirts = async () => {
  try {
    dispatch(shirts({ status: 'pending', err: false }));

    const response = await Http.get<APIShirtProps[]>(`/seed/shirts`, true);

    dispatch(shirts(normalizeResponse(response, null)));
  } catch (e: any) {
    Http.logError(e, shirts);
  }
};
