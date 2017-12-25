import { ContactEntity } from '../../../../server/modules/contact/contact.entity';

export interface ContactStoreState {
  item: ContactEntity;
  list: ContactEntity[];
}
