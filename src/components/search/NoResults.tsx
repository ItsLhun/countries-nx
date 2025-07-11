import { useTranslation } from 'next-i18next';

export default function NoResults() {
  const { t } = useTranslation();
  return (
    <div className="col-span-full py-12 text-center">
      <p className="text-lg font-medium text-text">
        {t('noResults', 'No countries match your search.')}
      </p>
    </div>
  );
}
