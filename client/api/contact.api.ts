import { CommonApi } from './internals/base.api';
import { ContactEntity } from '../../server/modules/contact/contact.entity';

class ContactApi extends CommonApi<ContactEntity> {

}

export const contactApi = new ContactApi('contact');
