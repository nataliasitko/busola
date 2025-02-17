import { useTranslation } from 'react-i18next';

import { LayoutPanelRow } from 'shared/components/LayoutPanelRow/LayoutPanelRow';
import { ResourceDetails } from 'shared/components/ResourceDetails/ResourceDetails';
import { UI5Panel } from 'shared/components/UI5Panel/UI5Panel';
import { EMPTY_TEXT_PLACEHOLDER } from 'shared/constants';
import { EventsList } from 'shared/components/EventsList';
import { filterByResource } from 'hooks/useMessageList';

import { PersistentVolumesList } from './PersistentVolumesList';
import { PersistentVolumeClaimsList } from './PersistentVolumeClaimsList';
import StorageClassCreate from './StorageClassCreate';
import { Text } from '@ui5/webcomponents-react';
import { ResourceDescription } from 'resources/StorageClasses';

export function StorageClassDetails(props) {
  const { t } = useTranslation();

  const StorageClassConfiguration = storageclass => {
    const parameters = storageclass?.parameters || [];

    return (
      <UI5Panel
        fixed
        keyComponent={'storageclass-configuration'}
        key="storageclass-configuration"
        title={t('storage-classes.headers.configuration')}
      >
        <LayoutPanelRow
          name={t('storage-classes.headers.provisioner')}
          value={storageclass.provisioner || EMPTY_TEXT_PLACEHOLDER}
        />
        <LayoutPanelRow
          name={t('storage-classes.headers.reclaim-policy')}
          value={storageclass.reclaimPolicy || EMPTY_TEXT_PLACEHOLDER}
        />
        <LayoutPanelRow
          name={t('storage-classes.headers.volume-binding-mode')}
          value={storageclass.volumeBindingMode || EMPTY_TEXT_PLACEHOLDER}
        />
        <LayoutPanelRow
          name={t('storage-classes.headers.allow-volume-expansion')}
          value={storageclass.allowVolumeExpansion || EMPTY_TEXT_PLACEHOLDER}
        />
        <UI5Panel
          fixed
          keyComponent={'storageclass-parameters'}
          title={t('storage-classes.headers.parameters')}
        >
          {Object.keys(parameters).length > 0 ? (
            Object.entries(parameters).map(parameters => {
              return (
                <LayoutPanelRow
                  name={parameters[0]}
                  value={parameters[1] || EMPTY_TEXT_PLACEHOLDER}
                  key={parameters[0]}
                />
              );
            })
          ) : (
            <Text>{t('common.messages.no-entries-found')}</Text>
          )}
        </UI5Panel>
      </UI5Panel>
    );
  };

  const Events = () => (
    <EventsList
      key="events"
      namespace={props.namespace}
      filter={filterByResource('StorageClass', props.resourceName)}
      hideInvolvedObjects={true}
    />
  );

  return (
    <ResourceDetails
      customComponents={[
        StorageClassConfiguration,
        PersistentVolumesList,
        PersistentVolumeClaimsList,
        Events,
      ]}
      description={ResourceDescription}
      resourceTitle={t('storage-classes.title')}
      singularName={t('storage-classes.name_singular')}
      createResourceForm={StorageClassCreate}
      {...props}
    />
  );
}

export default StorageClassDetails;
