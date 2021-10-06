import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import {
  Image,
  Section,
  DateRangeSection,
  UsePercentSection,
} from '../../components';

const Customize = () => {
  const { suffix } = useParams();

  const userId = useSelector((state) => state.user.userId);

  const [selectedTimeRange, setSelectedTimeRange] = useState({
    id: 3,
    name: 'Past 1 Year',
    disabled: false,
    timeRange: 'one_year',
  });

  const [usePercent, setUsePercent] = useState(false);

  const time = selectedTimeRange.timeRange;
  let fullSuffix = `${suffix}?time_range=${time}`;

  if (usePercent) {
    fullSuffix += '&use_percent=True';
  }

  const isAuthenticated = userId && userId.length > 0;

  if (!isAuthenticated) {
    return (
      <div className="h-full py-8 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Please sign in to access this page
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full py-8 flex justify-center items-center text-gray-600 body-font">
      <div className="container px-8 mx-auto flex flex-wrap">
        <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
          <div className="w-48 h-full bg-blue-500" />
        </div>
        <div className="w-full flex flex-wrap sm:flex-row flex-col pt-6 pb-8">
          <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
            Customize your SVG
          </h1>
          <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
            Modify the SVG to your liking. Edit the start and end date, exclude
            specific languages or repositories, control the theme, and more!
          </p>
        </div>
        <div className="w-2/5 pr-10 p-10 rounded bg-gray-200">
          <DateRangeSection
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
          />
          {suffix === 'langs' && (
            <UsePercentSection
              usePercent={usePercent}
              setUsePercent={setUsePercent}
            />
          )}
          <Section />
        </div>
        <div className="lg:w-3/5 md:w-1/2 object-center">
          <div className="w-3/5 mx-auto h-full flex flex-col justify-center">
            <Image imageSrc={fullSuffix} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
