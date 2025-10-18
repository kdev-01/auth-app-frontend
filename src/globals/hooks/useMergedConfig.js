import { useMemo } from "react";

function useMergedConfig(baseConfig, dynamicData) {
	return useMemo(() => {
		return baseConfig.map((item) => {
			if (dynamicData?.[item.key]) {
				return { ...item, options: dynamicData[item.key] };
			}

			return { ...item };
		});
	}, [baseConfig, dynamicData]);
}

export default useMergedConfig;
