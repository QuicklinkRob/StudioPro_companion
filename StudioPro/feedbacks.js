import { combineRgb } from '@companion-module/base'

export function getFeedbacks() {
	const feedbacks = {}

	const ColorWhite = combineRgb(255, 255, 255)
	const ColorGray = combineRgb(72, 72, 72)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)
	const ColorQLGreen = combineRgb(156, 172, 55)
	const ColorQLRed = combineRgb(226, 87, 76)
	const ColorBlue = combineRgb(0, 0, 255)

	feedbacks['streaming'] = {
		type: 'boolean',
		name: 'Streaming Active',
		description: 'If streaming is active, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [],
		callback: () => {
			return this.states.streaming
		},
	}

	feedbacks['recording'] = {
		type: 'advanced',
		name: 'Recording Status',
		description: 'If recording is active or paused, change the style of the button',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color (Recording)',
				id: 'fg',
				default: ColorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Background color (Recording)',
				id: 'bg',
				default: ColorRed,
			},
			{
				type: 'colorpicker',
				label: 'Foreground color (Paused)',
				id: 'fg_paused',
				default: ColorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Background color (Paused)',
				id: 'bg_paused',
				default: ColorOrange,
			},
		],
		callback: (feedback) => {
			if (this.states.recording === 'Recording') {
				return { color: feedback.options.fg, bgcolor: feedback.options.bg }
			} else if (this.states.recording === 'Paused') {
				return { color: feedback.options.fg_paused, bgcolor: feedback.options.bg_paused }
			} else {
				return {}
			}
		},
	}

	feedbacks['scene_active'] = {
		type: 'advanced',
		name: 'Scene in Preview / Program',
		description: 'If a scene is in preview or program, change colors of the button',
		options: [
			{
				type: 'dropdown',
				label: 'Mode',
				id: 'mode',
				default: 'programAndPreview',
				choices: [
					{ id: 'programAndPreview', label: 'Program and Preview' },
					{ id: 'program', label: 'Program Only' },
					{ id: 'preview', label: 'Preview Only' },
				],
			},
			{
				type: 'dropdown',
				label: 'Scene',
				id: 'scene',
				default: this.sceneListDefault,
				choices: this.sceneChoices,
				minChoicesForSearch: 5,
			},
			{
				type: 'colorpicker',
				label: 'Foreground color (Program)',
				id: 'fg',
				default: ColorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Background color (Program)',
				id: 'bg',
				default: ColorRed,
			},
			{
				type: 'colorpicker',
				label: 'Foreground color (Preview)',
				id: 'fg_preview',
				default: ColorWhite,
			},
			{
				type: 'colorpicker',
				label: 'Background color (Preview)',
				id: 'bg_preview',
				default: ColorGreen,
			},
		],
		callback: (feedback) => {
			let mode = feedback.options.mode
			if (!mode) {
				mode = 'programAndPreview'
			}
			if (this.states.programScene === feedback.options.scene && (mode === 'programAndPreview' || mode === 'program')) {
				return { color: feedback.options.fg, bgcolor: feedback.options.bg }
			} else if (
				this.states.previewScene === feedback.options.scene &&
				typeof feedback.options.fg_preview === 'number' &&
				this.states.studioMode === true &&
				(mode === 'programAndPreview' || mode === 'preview')
			) {
				return { color: feedback.options.fg_preview, bgcolor: feedback.options.bg_preview }
			} else {
				return {}
			}
		},
	}

	feedbacks['sceneProgram'] = {
		type: 'boolean',
		name: 'Scene in Program',
		description: 'If a scene is in program, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorRed,
		},
		options: [
			// {
			// 	type: 'dropdown',
			// 	label: 'Scene',
			// 	id: 'scene',
			// 	default: this.sceneListDefault,
			// 	choices: this.sceneChoices,
			// 	minChoicesForSearch: 5,
			// },
			{
                type: 'textinput',
                useVariables: true,
                label: 'Which scene? (scene_<number>)',
                id: 'customSceneName',
                default: 'scene_',
                // isVisible: (options) => options.scene === 'customSceneName',
            },
		],
		callback: (feedback) => {
			try {
				const programVariableValue = this.getVariableValue(feedback.options.customSceneName) || 'None';
				// return this.states.programScene === feedback.options.scene
				// this.log('debug', `Feedback check - programVariableValue: ${programVariableValue}`);

				return this.states.programScene === programVariableValue
			} catch (error) {
				this.log('error', `Error in sceneProgram feedback: ${error.message}`);
				return false;
			}
		},
	}

	feedbacks['sceneMix'] = {
		type: 'boolean',
		name: 'Scene in Mix',
		description: 'If a scene is in the specified mix, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorOrange,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Mix Number',
				id: 'mixNumber',
				default: '1',
				choices: [
					{ id: '1', label: 'Mix 1' },
					{ id: '2', label: 'Mix 2' },
					{ id: '3', label: 'Mix 3' },
					{ id: '4', label: 'Mix 4' },
					{ id: '5', label: 'Mix 5' },
					{ id: '6', label: 'Mix 6' },
					{ id: '7', label: 'Mix 7' },
					{ id: '8', label: 'Mix 8' },
				],
			},
			{
				type: 'dropdown',
				label: 'Select Scene',
				id: 'customSceneName',
				default: this.sceneListDefault,
				choices: this.sceneChoicesCustomScene,
			},
			// {
			// 	type: 'textinput',
			// 	useVariables: true,
			// 	label: 'Which scene? (scene_<number>)',
			// 	id: 'customSceneName',
			// 	default: 'scene_',
			// },
		],
		callback: (function() {
			// previous results to to check against so that only changes are logged
			const previousResults = {};
			
			return function(feedback) {
				try {
					const sceneVariableValue = this.getVariableValue(feedback.options.customSceneName) || 'None';
					const mixSceneValue = this.getVariableValue(`mix${feedback.options.mixNumber}`) || 'None';
					const result = sceneVariableValue === mixSceneValue;
					
					// key for this specific feedback instance
					const key = `${feedback.options.mixNumber}-${feedback.options.customSceneName}`;
					
					// only log if the result has changed
					if (previousResults[key] !== result) {
						console.log('Mix feedback state changed:', {
							mixNumber: feedback.options.mixNumber,
							scene: sceneVariableValue,
							mixScene: mixSceneValue,
							result: result
						});
						previousResults[key] = result;
					}
					
					return result;
				} catch (error) {
					// console.log('Error in sceneMix feedback:', error, error.message);
					// console.log('error', `Error in sceneMix feedback: ${error.message}`);
					return false;
				}
			};
		})(),
	}

	// REVIEW: this IIFE might not be working as expected due to the this.getVariableValue() not being available in the callback function??? Replace with this???
	
	// feedbacks['sceneMix'] = {
	// 	type: 'boolean',
	// 	name: 'Scene in Mix',
	// 	description: 'If a scene is in the specified mix, change the style of the button',
	// 	defaultStyle: {
	// 		color: ColorWhite,
	// 		bgcolor: ColorOrange,
	// 	},
	// 	options: [
	// 		{
	// 			type: 'dropdown',
	// 			label: 'Mix Number',
	// 			id: 'mixNumber',
	// 			default: '1',
	// 			choices: [
	// 				{ id: '1', label: 'Mix 1' },
	// 				{ id: '2', label: 'Mix 2' },
	// 				{ id: '3', label: 'Mix 3' },
	// 				{ id: '4', label: 'Mix 4' },
	// 				{ id: '5', label: 'Mix 5' },
	// 				{ id: '6', label: 'Mix 6' },
	// 				{ id: '7', label: 'Mix 7' },
	// 				{ id: '8', label: 'Mix 8' },
	// 			],
	// 		},
	// 		{
	// 			type: 'dropdown',
	// 			label: 'Select Scene',
	// 			id: 'customSceneName',
	// 			default: this.sceneListDefault,
	// 			choices: this.sceneChoicesCustomScene,
	// 		},
	// 	],
	// 	callback: (feedback) => {
	// 		try {
	// 			const sceneVariableValue = this.getVariableValue(feedback.options.customSceneName) || 'None';
	// 			const mixSceneValue = this.getVariableValue(`mix${feedback.options.mixNumber}`) || 'None';
	// 			const result = sceneVariableValue === mixSceneValue;
				
	// 			console.log('Mix feedback check:', {
	// 				mixNumber: feedback.options.mixNumber,
	// 				scene: sceneVariableValue,
	// 				mixScene: mixSceneValue,
	// 				result: result
	// 			});
				
	// 			return result;
	// 		} catch (error) {
	// 			console.log('Error in sceneMix feedback:', error);
	// 			return false;
	// 		}
	// 	},
	// }

	feedbacks['scenePreview'] = {
		type: 'boolean',
		name: 'Scene in Preview',
		description: 'If a scene is in preview, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
            {
                type: 'textinput',
                useVariables: true,
                label: 'Which scene? (scene_<number>)',
                id: 'customSceneName',
                default: 'scene_',
                // isVisible: (options) => options.scene === 'customSceneName',
            },
        ],
        callback: async (feedback) => {
			try {
				// this.log('debug', `Feedback check - customSceneName: ${JSON.stringify(feedback.options)}. this.states.previewScene: ${this.states.previewScene}`);
				// const variableValue = this.states.previewScene;
				const variableValue = this.getVariableValue(feedback.options.customSceneName) || 'None';
				// const variableValue = await context.parseVariablesInString(feedback.options.customSceneName) || 'None';
				// this.log('debug', `Feedback check - variableValue: ${variableValue}`);
				return this.states.previewScene === variableValue;
				
			} catch (error) {
				this.log('error', `Error in scenePreview feedback: ${error.message}`);
				return false;
			}
		},
		// options: [
		// 	{
		// 		type: 'dropdown',
		// 		label: 'Scene',
		// 		id: 'scene',
		// 		default: this.sceneListDefault,
		// 		choices: this.sceneChoices,
		// 		minChoicesForSearch: 5,
		// 	},
		// ],
		// callback: (feedback) => {
		// 	return this.states.previewScene === feedback.options.scene
		// },
	}

	feedbacks['scene_item_active'] = {
		type: 'boolean',
		name: 'Source Visible in Program',
		description: 'If a source is visible in the program, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Scene',
				id: 'scene',
				default: 'anyScene',
				choices: this.sceneChoicesAnyScene,
			},
			{
				type: 'dropdown',
				label: 'Source name',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
			},
		],
		callback: (feedback) => {
			if (this.sources[feedback.options.source]?.active && feedback.options.scene === 'anyScene') {
				return true
			} else if (this.sources[feedback.options.source]?.active && feedback.options.scene === this.states.programScene) {
				return true
			}
		},
	}

	feedbacks['scene_item_previewed'] = {
		type: 'boolean',
		name: 'Source Active in Preview',
		description: 'If a source is enabled in the preview scene, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Source name',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
				minChoicesForSearch: 5,
			},
		],
		callback: (feedback) => {
			return this.sources[feedback.options.source]?.videoShowing
		},
	}

	feedbacks['profile_active'] = {
		type: 'boolean',
		name: 'Profile Active',
		description: 'If a profile is active, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Profile name',
				id: 'profile',
				default: this.profileChoicesDefault,
				choices: this.profileChoices,
				minChoicesForSearch: 5,
			},
		],
		callback: (feedback) => {
			if (this.states.currentProfile === feedback.options.profile) {
				return true
			}
		},
	}

	feedbacks['scene_collection_active'] = {
		type: 'boolean',
		name: 'Scene Collection Active',
		description: 'If a scene collection is active, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Scene collection name',
				id: 'scene_collection',
				default: this.sceneCollectionList?.[0] ? this.sceneCollectionList[0].id : '',
				choices: this.sceneCollectionList,
				minChoicesForSearch: 5,
			},
		],
		callback: (feedback) => {
			if (this.states.currentSceneCollection === feedback.options.scene_collection) {
				return true
			}
		},
	}

	feedbacks['scene_item_active_in_scene'] = {
		type: 'boolean',
		name: 'Source Enabled in Scene',
		description: 'If a source is enabled in a specific scene, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Scene',
				id: 'scene',
				default: this.sceneListDefault,
				choices: this.sceneChoices,
				allowCustom: true,
				minChoicesForSearch: 5,
			},
			{
				type: 'checkbox',
				label: 'Any Source',
				id: 'any',
				default: false,
			},
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
				allowCustom: true,
				minChoicesForSearch: 5,
				isVisible: (options) => !options.any,
			},
		],
		callback: async (feedback, context) => {
			let sceneName = await this.parseVariablesInString(feedback.options.scene, context)
			let sourceName = await this.parseVariablesInString(feedback.options.source, context)

			if (feedback.options.any) {
				let scene = this.sceneItems[sceneName]

				if (scene) {
					let enabled = this.sceneItems[sceneName].find((item) => item.sceneItemEnabled === true)
					if (enabled) {
						return true
					}
				}
			} else {
				if (this.sources[sourceName]?.groupedSource) {
					let group = this.sources[sourceName].groupName
					let sceneItem = this.groups[group].find((item) => item.sourceName === sourceName)
					if (sceneItem) {
						return sceneItem.sceneItemEnabled
					}
				} else if (this.sceneItems[sceneName]) {
					let sceneItem = this.sceneItems[sceneName].find((item) => item.sourceName === sourceName)
					if (sceneItem) {
						return sceneItem.sceneItemEnabled
					}
				}
			}
		},
	}

	feedbacks['output_active'] = {
		type: 'boolean',
		name: 'Output Active',
		description: 'If an output is currently active, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Output name',
				id: 'output',
				default: 'virtualcam_output',
				choices: this.outputList,
				minChoicesForSearch: 3,
			},
		],
		callback: (feedback) => {
			return this.outputs[feedback.options.output]?.outputActive
		},
	}

	feedbacks['replayBufferActive'] = {
		type: 'boolean',
		name: 'Replay Buffer Active',
		description: 'If the replay buffer is currently active, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorRed,
		},
		options: [],
		callback: () => {
			return this.states.replayBuffer
		},
	}

	feedbacks['transition_active'] = {
		type: 'boolean',
		name: 'Transition in Progress',
		description: 'If a transition is in progress, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [],
		callback: () => {
			// Don't show active for quick cuts
			return this.states.transitionActive && !this.states.isQuickCut
		},
	}

	feedbacks['current_transition'] = {
		type: 'boolean',
		name: 'Current Transition Type',
		description: 'If a transition type is selected, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Transition',
				id: 'transition',
				default: this.transitionList?.[0] ? this.transitionList[0].id : '',
				choices: this.transitionList,
				minChoicesForSearch: 5,
			},
		],
		callback: (feedback) => {
			// Don't show Cut transitions (they should never be the "current" transition)
			if (feedback.options.transition === 'Cut') {
				return false;
			}
			
			// During quick cuts, use the original transition instead of the temporary "Cut"
			let currentTransition = this.states.currentTransition;
			if (this.states.isQuickCut && currentTransition === 'Cut') {
				// Use the stored original transition during quick cuts
				currentTransition = this.states.originalTransition || currentTransition;
			}
			
			// Show the button if it matches the current transition
			if (currentTransition === feedback.options.transition) {
				return true;
			}
			
			return false;
		},
	}

	feedbacks['transition_duration'] = {
		type: 'boolean',
		name: 'Transition Duration',
		description: 'If the transition duration is matched, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'number',
				label: 'Transition time (in ms)',
				id: 'duration',
				default: null,
				min: 0,
				max: 60 * 1000, //max is required by api
				range: false,
			},
		],
		callback: (feedback) => {
			if (this.states.transitionDuration === feedback.options.duration) {
				return true
			}
		},
	}

	feedbacks['filter_enabled'] = {
		type: 'boolean',
		name: 'Filter Enabled',
		description: 'If a filter is enabled, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoicesWithScenes,
			},
			{
				type: 'dropdown',
				label: 'Filter',
				id: 'filter',
				default: this.filterListDefault,
				choices: this.filterList,
			},
		],
		callback: (feedback) => {
			if (this.sourceFilters[feedback.options.source]) {
				let filter = this.sourceFilters[feedback.options.source].find(
					(item) => item.filterName === feedback.options.filter
				)
				if (filter) {
					return filter.filterEnabled
				}
			}
		},
	}

	feedbacks['audio_muted'] = {
		type: 'boolean',
		name: 'Audio Muted',
		description: 'If an audio source is muted, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Source name',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
		],
		callback: (feedback) => {
			return this.sources[feedback.options.source]?.inputMuted
		},
	}

	feedbacks['audio_monitor_type'] = {
		type: 'boolean',
		name: 'Audio Monitor Type',
		description: 'If the audio monitor type is matched, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
			{
				type: 'dropdown',
				label: 'Monitor',
				id: 'monitor',
				default: 'none',
				choices: [
					{ id: 'none', label: 'None' },
					{ id: 'monitorOnly', label: 'Monitor Only' },
					{ id: 'monitorAndOutput', label: 'Monitor and Output' },
				],
			},
		],
		callback: (feedback) => {
			let monitorType
			if (feedback.options.monitor === 'monitorAndOutput') {
				monitorType = 'CRE8_MONITORING_TYPE_MONITOR_AND_OUTPUT'
			} else if (feedback.options.monitor === 'monitorOnly') {
				monitorType = 'CRE8_MONITORING_TYPE_MONITOR_ONLY'
			} else {
				monitorType = 'CRE8_MONITORING_TYPE_NONE'
			}
			return this.sources[feedback.options.source]?.monitorType == monitorType
		},
	}

	feedbacks['volume'] = {
		type: 'boolean',
		name: 'Volume',
		description: 'If an audio source volume is matched, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Source name',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
			{
				type: 'number',
				label: 'Volume in dB (-100 to 26) ',
				id: 'volume',
				default: 0,
				min: -100,
				max: 26,
				range: false,
			},
		],
		callback: (feedback) => {
			this.log('feedback.options.volume', feedback.options.volume)
			return this.sources[feedback.options.source]?.inputVolume == feedback.options.volume
		},
	}

	feedbacks['media_playing'] = {
		type: 'boolean',
		name: 'Media Playing',
		description: 'If a media source is playing, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: this.mediaSourceList?.[0] ? this.mediaSourceList[0].id : '',
				choices: this.mediaSourceList,
			},
		],
		callback: (feedback) => {
			return this.mediaSources[feedback.options.source]?.mediaState == 'CRE8_MEDIA_STATE_PLAYING'
		},
	}

	feedbacks['media_source_time_remaining'] = {
		type: 'boolean',
		name: 'Media Source Remaining Time',
		description: 'If remaining time of a media source is below a threshold, change the style of the button',
		defaultStyle: {
			color: ColorBlack,
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Source name',
				id: 'source',
				default: this.mediaSourceList?.[0] ? this.mediaSourceList[0].id : '',
				choices: this.mediaSourceList,
			},
			{
				type: 'number',
				label: 'Remaining time threshold (in seconds)',
				id: 'rtThreshold',
				default: 20,
				min: 0,
				max: 3600, //max is required by api
				range: false,
			},
			{
				type: 'checkbox',
				label: 'Feedback only if source is on program',
				id: 'onlyIfSourceIsOnProgram',
				default: false,
			},
			{
				type: 'checkbox',
				label: 'Feedback only if source is playing',
				id: 'onlyIfSourceIsPlaying',
				default: false,
			},
			{
				type: 'checkbox',
				label: 'Blinking',
				id: 'blinkingEnabled',
				default: false,
			},
		],
		callback: (feedback) => {
			let remainingTime // remaining time in seconds
			let mediaState
			if (this.mediaSources[feedback.options.source]) {
				remainingTime = Math.round(
					(this.mediaSources[feedback.options.source].mediaDuration -
						this.mediaSources[feedback.options.source].mediaCursor) /
						1000
				)
				mediaState = this.mediaSources[feedback.options.source].mediaState
			}
			if (remainingTime === undefined) return false

			if (feedback.options.onlyIfSourceIsOnProgram && !this.sources[feedback.options.source].active) {
				return false
			}

			if (feedback.options.onlyIfSourceIsPlaying && mediaState !== 'CRE8_MEDIA_STATE_PLAYING') {
				return false
			}

			if (remainingTime <= feedback.options.rtThreshold) {
				if (feedback.options.blinkingEnabled && mediaState === 'CRE8_MEDIA_STATE_PLAYING') {
					if (remainingTime % 2 != 0) {
						return false
					}
				}
				return true
			}
		},
	}

	// playlist feedbacks
	feedbacks['playlist_loop_active'] = {
		type: 'boolean',
		name: 'Playlist Loop Active',
		description: 'If playlist loop is enabled, change the style of the button',
		defaultStyle: {
			color: ColorBlack,
			bgcolor: ColorOrange,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: this.mediaSourceList?.[0] ? this.mediaSourceList[0].id : '',
				choices: this.mediaSourceList,
			},
		],
		callback: (feedback) => {
			const sourceName = feedback.options.source === 'currentMedia' ? this.states.currentMedia : feedback.options.source
			const validName = this.sources[sourceName]?.validName ?? sourceName
			return this.getVariableValue(`media_playlist_loop_state_${validName}`) === 'true'
		},
	}

	feedbacks['item_loop_active'] = {
		type: 'boolean',
		name: 'Item Loop Active',
		description: 'If current item loop is enabled, change the style of the button',
		defaultStyle: {
			color: ColorBlack,
			bgcolor: ColorBlue,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: this.mediaSourceList?.[0] ? this.mediaSourceList[0].id : '',
				choices: this.mediaSourceList,
			},
		],
		callback: (feedback) => {
			const sourceName = feedback.options.source === 'currentMedia' ? this.states.currentMedia : feedback.options.source
			const validName = this.sources[sourceName]?.validName ?? sourceName
			return this.getVariableValue(`media_loop_state_${validName}`) === 'true'
		},
	}

	feedbacks['auto_advance_active'] = {
		type: 'boolean',
		name: 'Auto Advance Active',
		description: 'If auto advance is enabled, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorQLGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: this.mediaSourceList?.[0] ? this.mediaSourceList[0].id : '',
				choices: this.mediaSourceList,
			},
		],
		callback: (feedback) => {
			const sourceName = feedback.options.source === 'currentMedia' ? this.states.currentMedia : feedback.options.source
			const validName = this.sources[sourceName]?.validName ?? sourceName
			return this.getVariableValue(`media_auto_advance_${validName}`) === 'true'
		},
	}

	// Media Tab Feedbacks
	feedbacks['media_tab_selected'] = {
		type: 'boolean',
		name: 'Media Tab Selected',
		description: 'If this media tab is currently selected, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: 0x0066FF, // Blue when this tab is selected
		},
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: '1',
				choices: [
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
		],
		callback: (feedback) => {
			const activeMediaTab = this.getVariableValue('active_media_tab') || '1';
			const isSelected = activeMediaTab === feedback.options.mediaTab;
			
			// Only show feedback if tab is selected AND has a media source assigned
			const mediaSource = this.getVariableValue(`media_tab_${feedback.options.mediaTab}_source`);
			const hasMediaSource = mediaSource && mediaSource !== '';
			
			// console.log('Media Tab feedback debug for tab:', feedback.options.mediaTab);
			// console.log('  activeMediaTab:', activeMediaTab);
			// console.log('  isSelected:', isSelected);
			// console.log('  mediaSource:', mediaSource);
			// console.log('  hasMediaSource:', hasMediaSource);
			// console.log('  result:', isSelected && hasMediaSource);
			
			// Temporarily return just selection to test
			return isSelected; // Remove media source requirement for testing
		},
	}

	feedbacks['media_tab_playing'] = {
		type: 'boolean',
		name: 'Media Tab Playing',
		description: 'If media tab is playing, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: '1',
				choices: [
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
		],
		callback: (feedback) => {
			const mediaSourceName = this.getVariableValue(`media_tab_${feedback.options.mediaTab}_source`);
			if (!mediaSourceName) return false;
			
			return this.mediaSources[mediaSourceName]?.mediaState == 'CRE8_MEDIA_STATE_PLAYING';
		},
	}

	feedbacks['active_media_tab_playing'] = {
		type: 'boolean',
		name: 'Active Media Tab Playing',
		description: 'If the currently active media tab is playing, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [],
		callback: () => {
			const activeTab = this.getVariableValue('active_media_tab') || '1';
			const mediaSourceName = this.getVariableValue(`media_tab_${activeTab}_source`);
			if (!mediaSourceName) return false;
			
			return this.mediaSources[mediaSourceName]?.mediaState == 'CRE8_MEDIA_STATE_PLAYING';
		},
	}

	feedbacks['media_tab_paused_flash'] = {
		type: 'advanced',
		name: 'Media Tab Paused Flash',
		description: 'Flash when media tab is paused',
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: '1',
				choices: [
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
			{
				type: 'colorpicker',
				label: 'Flash Color',
				id: 'flashColor',
				default: ColorGreen,
			},
		],
		callback: (feedback) => {
			const mediaSourceName = this.getVariableValue(`media_tab_${feedback.options.mediaTab}_source`);
			if (!mediaSourceName) return {};
			
			const mediaState = this.mediaSources[mediaSourceName]?.mediaState;
			
			if (mediaState === 'CRE8_MEDIA_STATE_PAUSED') {
				// Simple time-based flash - no timers needed
				const now = Date.now();
				const flashOn = Math.floor(now / 500) % 2 === 0; // Flash every 500ms
				
				return flashOn ? 
					{ color: ColorWhite, bgcolor: feedback.options.flashColor } : 
					{};
			}
			
			return {};
		},
	}

	feedbacks['active_media_tab_paused_flash'] = {
		type: 'advanced',
		name: 'Active Media Tab Paused Flash',
		description: 'Flash when the active media tab is paused',
		options: [
			{
				type: 'colorpicker',
				label: 'Flash Color',
				id: 'flashColor',
				default: ColorGreen,
			},
		],
		callback: (feedback) => {
			const activeTab = this.getVariableValue('active_media_tab') || '1';
			const mediaSourceName = this.getVariableValue(`media_tab_${activeTab}_source`);
			if (!mediaSourceName) return {};
			
			const mediaState = this.mediaSources[mediaSourceName]?.mediaState;
			
			if (mediaState === 'CRE8_MEDIA_STATE_PAUSED') {
				// Simple time-based flash - no timers needed
				const now = Date.now();
				const flashOn = Math.floor(now / 500) % 2 === 0; // Flash every 500ms
				
				return flashOn ? 
					{ color: ColorWhite, bgcolor: feedback.options.flashColor } : 
					{};
			}
			
			return {};
		},
	}

	feedbacks['media_tab_status'] = {
		type: 'advanced',
		name: 'Media Tab Status Display',
		description: 'Display media tab status with color coding',
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: '1',
				choices: [
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
		],
		callback: (feedback) => {
			const tabNumber = feedback.options.mediaTab;
			const mediaSourceName = this.getVariableValue(`media_tab_${tabNumber}_source`);
			const tabName = this.getVariableValue(`media_tab_${tabNumber}_name`) || `Tab ${tabNumber}`;
			
			if (!mediaSourceName) {
				return { 
					text: `${tabName}: No Source`,
					color: ColorGray 
				};
			}

			const mediaState = this.mediaSources[mediaSourceName]?.mediaState;
			let status = 'Unknown';
			let bgcolor = ColorGray;

			if (mediaState === 'CRE8_MEDIA_STATE_PLAYING') {
				status = 'Playing';
				bgcolor = ColorGreen;
			} else if (mediaState === 'CRE8_MEDIA_STATE_PAUSED') {
				status = 'Paused';
				bgcolor = ColorOrange;
			} else if (mediaState === 'CRE8_MEDIA_STATE_STOPPED') {
				status = 'Stopped';
				bgcolor = ColorRed;
			}

			return {
				text: `${tabName}: ${status}`,
				color: ColorWhite,
				bgcolor: bgcolor
			};
		},
	}

	feedbacks['studioMode'] = {
		type: 'boolean',
		name: 'Studio Mode Active',
		description: 'If Studio Mode is active, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [],
		callback: () => {
			return this.states.studioMode
		},
	}

	feedbacks['streamCongestion'] = {
		type: 'advanced',
		name: 'Stream Congestion',
		description: 'Change the style of the button to show stream congestion',
		options: [
			{
				type: 'colorpicker',
				label: 'Background color (No Stream)',
				id: 'colorNoStream',
				default: ColorGray,
			},
			{
				type: 'colorpicker',
				label: 'Background color (Low Congestion)',
				id: 'colorLow',
				default: ColorGreen,
			},
			{
				type: 'colorpicker',
				label: 'Background color (Medium Congestion)',
				id: 'colorMedium',
				default: ColorOrange,
			},
			{
				type: 'colorpicker',
				label: 'Background color (High Congestion)',
				id: 'colorHigh',
				default: ColorRed,
			},
		],
		callback: (feedback) => {
			if (this.states.streaming === false) {
				return { bgcolor: feedback.options.colorNoStream }
			} else {
				if (this.states.streamCongestion > 0.8) {
					return { bgcolor: feedback.options.colorHigh }
				} else if (this.states.congestion > 0.4) {
					return { bgcolor: feedback.options.colorMedium }
				} else {
					return { bgcolor: feedback.options.colorLow }
				}
			}
		},
	}

	feedbacks['freeDiskSpaceRemaining'] = {
		type: 'boolean',
		name: 'Disk Space Remaining',
		description: 'Change the style of the button if remaining disk space is below a certain value',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'number',
				label: 'Remaining Space (MB)',
				id: 'diskSpace',
				default: 10000,
				min: 0,
				range: false,
			},
		],
		callback: (feedback) => {
			return this.states.stats?.availableDiskSpace < feedback.options.diskSpace
		},
	}

	feedbacks['audioPeaking'] = {
		type: 'boolean',
		name: 'Audio Peaking',
		description: 'If audio is above a certain dB value, change the style of the button',
		defaultStyle: {
			color: ColorBlack,
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Source name',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
			{
				type: 'number',
				label: 'Peak in dB (-100 to 26) ',
				id: 'peak',
				default: 0,
				min: -100,
				max: 26,
				range: false,
			},
		],
		callback: (feedback) => {
			return this.audioPeak?.[feedback.options.source] > feedback.options.peak
		},
	}

	feedbacks['audioMeter'] = {
		type: 'advanced',
		name: 'Audio Meter',
		description: 'Change the style of the button to show audio meter colors similar to the CRE8 UI',
		options: [
			{
				type: 'dropdown',
				label: 'Source name',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
		],
		callback: (feedback) => {
			let peak = this.audioPeak?.[feedback.options.source]
			if (peak > -9) {
				return { bgcolor: ColorRed }
			} else if (peak > -20) {
				return { bgcolor: ColorOrange }
			} else {
				return { bgcolor: ColorGreen }
			}
		},
	}

	feedbacks['vendorEvent'] = {
		type: 'boolean',
		name: 'Vendor Event',
		description: 'Change the style of the button based on third party vendor events',
		options: [
			{
				type: 'textinput',
				label: 'vendorName',
				id: 'vendorName',
				default: 'downstream-keyer',
			},
			{
				type: 'textinput',
				label: 'eventType',
				id: 'eventType',
				default: 'dsk_scene_changed',
			},
			{
				type: 'textinput',
				label: 'eventData Key',
				id: 'eventDataKey',
				default: 'new_scene',
			},
			{
				type: 'textinput',
				label: 'eventData Value',
				id: 'eventDataValue',
				default: 'Scene 1',
			},
		],
		callback: (feedback) => {
			if (this.vendorEvent) {
				if (this.vendorEvent.vendorName == feedback.options.vendorName) {
					if (this.vendorEvent.eventType == feedback.options.eventType) {
						if (this.vendorEvent.eventData) {
							let key = this.vendorEvent.eventData[feedback.options.eventDataKey]
							if (key && key == feedback.options.eventDataValue) {
								return true
							}
						}
					}
				}
			}
		},
	}

	feedbacks['audio_control_type'] = {
		type: 'advanced',
		name: 'Audio Control Type',
		description: 'If audio control type is source selection or audio volume control, change the style of the button',
		options: [
			{
				type: 'dropdown',
				label: 'Source Index',
				id: 'source_index',
				default: 0,
				choices: [
					{id: 0, label: "Source 1"},
					{id: 1, label: "Source 2"},
					{id: 2, label: "Source 3"},
					{id: 3, label: "Source 4"},
				],
			},
		],
		callback: (feedback) => {
			
			const sourceVarKeys = ['audio_control_type_1', 'audio_control_type_2', 'audio_control_type_3', 'audio_control_type_4'];
			const value = this.getVariableValue(sourceVarKeys[feedback.options.source_index])
			// console.log('feedback ', feedback);
			if (value === 2) {
				return { color: ColorWhite, bgcolor: ColorQLRed }
			} else if (value === 1) {
				return { color: ColorWhite, bgcolor: ColorQLGreen }
			} else {
				return {}
			}
		},
	}

		// Custom Scene Name changes [the style of the button and] displays the name
		feedbacks['custom_scene_name'] = {
			type: 'boolean',  // boolean is better than 'textinput' for feedbacks according to the docs
			name: 'Custom Scene Name',
			description: 'If a custom scene name is set, [change the style of the button and] display the name',
			options: [
				{
					type: 'textinput',
					label: 'Custom Scene Name',
					id: 'custom_scene_name',
				},
			],
			callback: (feedback) => {
				if (this.states.custom_scene_name === feedback.options.custom_scene_name) {
					return {
						text: this.states.custom_scene_name, 
					};
				}
				return {}; 
			},
		}

	feedbacks['program_volume_meter'] = {
		type: 'advanced',
		name: 'Program Volume Meter',
		description: 'Log program volume for testing (no visual feedback)',
		options: [], // No options needed, just for logging coz rotary knob
		callback: (feedback) => {
			const programVolume = this.getVariableValue('program_volume') || 0;
			const inputVolume = this.sources[this.states.programScene]?.inputVolume || 0;
			const sourceVolume = this.sources['Desktop Audio']?.inputVolume || 0;	
			
			// console.log(`[FEEDBACK] Program Volume Check - Variable: ${programVolume}dB, Input: ${inputVolume}dB, Source: ${sourceVolume}dB, Program Scene: ${this.states.programScene}`); 
			
			return {};
		},
	}

	feedbacks['dsk_tab_simple_active'] = {
		type: 'boolean',
		name: 'DSK Tab Simple Active',
		description: 'If the first DSK item in the selected tab is active, change the style of the button (simplified - one DSK per tab)',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorOrange,
		},
		options: [
			{
				type: 'dropdown',
				label: 'DSK Tab',
				id: 'dskTab',
				default: '1',
				choices: this.dskTabChoices,
			},
		],
		callback: (feedback) => {
			try {
				const dskTab = feedback.options.dskTab;
				
				if (!dskTab) {
					return false;
				}
				
				const dskTabIdx = parseInt(dskTab) - 1;
				if (dskTabIdx < 0) {
					return false;
				}
				
				// Get the first (and presumably only) DSK item in this tab
				const tabStates = this.dskStates?.[dskTabIdx];
				if (!tabStates) {
					return false;
				}
				
				// Get the first DSK item's state (assuming one per tab)
				const dskItemNames = Object.keys(tabStates);
				if (dskItemNames.length === 0) {
					return false;
				}
				
				// Use the first DSK item in the tab
				const firstDskItem = dskItemNames[0];
				const isActive = tabStates[firstDskItem] === true;
				
				return isActive;
				
			} catch (error) {
				console.log('Error in dsk_tab_simple_active feedback:', error);
				return false;
			}
		},
	}

	feedbacks['dsk_tab_active'] = {
		type: 'boolean',
		name: 'DSK Tab Active',
		description: 'If any DSK item in this tab is active, light up the button (shows state, does not toggle when clicked)',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorOrange, // Orange when any DSK in tab is active
		},
		options: [
			{
				type: 'dropdown',
				label: 'DSK Tab',
				id: 'dskTab',
				default: '1',
				choices: this.dskTabChoices,
			},
		],
		callback: (feedback) => {
			try {
				const dskTab = feedback.options.dskTab;
				const dskTabIdx = parseInt(dskTab) - 1;
				
				if (dskTabIdx < 0) {
					return false;
				}
				
				// Check if any DSK item in this tab is active
				const tabStates = this.dskStates?.[dskTabIdx];
				if (!tabStates) {
					return false;
				}
				
				// Return true if any DSK item in this tab is active
				for (const dskItemName in tabStates) {
					if (tabStates[dskItemName] === true) {
						return true;
					}
				}
				
				return false;
				
			} catch (error) {
				console.log('Error in dsk_tab_active feedback:', error);
				return false;
			}
		},
	}

	feedbacks['dsk_display_active'] = {
		type: 'advanced',
		name: 'DSK Display with Active State',
		description: 'Display DSK status as text and show orange background when active (Format: tab:item, e.g., "1:DSK 1")',
		options: [
			{
				type: 'textinput',
				label: 'DSK Display (Format: tab:item, e.g., "1:DSK 1")',
				id: 'dsk_input',
				default: '1:DSK 1',
			},
		],
		callback: (feedback) => {
			try {
				const input = feedback.options.dsk_input;
				if (!input || typeof input !== 'string') {
					return { text: 'No Input' };
				}
				
				// parse -> tab:item
				const parts = input.split(':');
				if (parts.length !== 2) {
					return { text: 'Invalid format' };
				}
				
				const tabNumberStr = parts[0].trim();
				const itemName = parts[1].trim();
				
				if (!tabNumberStr || !itemName) {
					return { text: 'Empty values' };
				}
				
				const tabNumber = parseInt(tabNumberStr);
				if (isNaN(tabNumber) || tabNumber < 1) {
					return { text: 'Invalid tab' };
				}
				
				const tabIndex = tabNumber - 1; // don't forget -> SE made it 0 indexed
				
				// Check if DSK states are loaded at all
				if (!this.dskStates || !this.dskStates[tabIndex]) {
					return { text: `T${tabNumber}: Loading...` };
				}
				
				// state for this DSK item
				const isEnabled = this.dskStates[tabIndex][itemName];
				
				if (isEnabled === undefined) {
					// Item doesn't exist - show available items for debugging
					const availableItems = Object.keys(this.dskStates[tabIndex]);
					if (availableItems.length === 0) {
						return { text: `T${tabNumber}: No items` };
					} else {
						// Show first available item instead
						const firstItem = availableItems[0];
						const firstItemState = this.dskStates[tabIndex][firstItem];
						const status = firstItemState ? 'ON' : 'OFF';
						const result = { text: `T${tabNumber}: ${firstItem}: ${status}` };
						
						if (firstItemState) {
							result.color = ColorWhite;
							result.bgcolor = ColorOrange;
						}
						
						return result;
					}
				}
				
				// display text and background colour
				const status = isEnabled ? 'ON' : 'OFF';
				const result = { text: `T${tabNumber}: ${itemName}: ${status}` };
				
				// orange background if active
				if (isEnabled) {
					result.color = ColorWhite;
					result.bgcolor = ColorOrange;
				}
				
				return result;
				
			} catch (error) {
				console.log('Error in dsk_display_active feedback:', error);
				return { text: 'Error' };
			}
		},
	}

	feedbacks['dsk_tab_selected'] = {
		type: 'boolean',
		name: 'DSK Tab Selected for Viewing',
		description: 'If this tab is currently selected for viewing/controlling with DSK item buttons',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: 0x0066FF, // Blue when this tab is selected for viewing
		},
		options: [
			{
				type: 'dropdown',
				label: 'DSK Tab',
				id: 'dskTab',
				default: '1',
				choices: this.dskTabChoices,
			},
		],
		callback: (feedback) => {
			const activeDskTab = this.getVariableValue('active_dsk_tab') || '1';
			const isSelected = activeDskTab === feedback.options.dskTab;
			return isSelected;
		},
	}

	feedbacks['dsk_item_active'] = {
		type: 'advanced',
		name: 'DSK Item Active in Selected Tab',
		description: 'Show the status of a DSK item position within the currently selected tab',
		options: [
			{
				type: 'dropdown',
				label: 'DSK Item Position',
				id: 'dskItemPosition',
				default: '1',
				choices: [
					{ id: '1', label: 'DSK Item 1' },
					{ id: '2', label: 'DSK Item 2' },
					{ id: '3', label: 'DSK Item 3' },
					{ id: '4', label: 'DSK Item 4' },
				],
			},
		],
		callback: (feedback) => {
			try {
				// Get the currently selected DSK tab
				const selectedDskTab = this.getVariableValue('active_dsk_tab') || '1';
				const dskTabIdx = parseInt(selectedDskTab) - 1;
				const itemPosition = parseInt(feedback.options.dskItemPosition) - 1;
				
				if (dskTabIdx < 0) {
					return { text: `Item ${feedback.options.dskItemPosition}: No Tab Selected` };
				}
				
				// Get the available DSK items for the selected tab
				const tabItems = this.dskItemChoicesByTab[dskTabIdx] || [];
				if (itemPosition >= tabItems.length) {
					return { text: `Item ${feedback.options.dskItemPosition}: Empty` };
				}
				
				const selectedItem = tabItems[itemPosition];
				const dskItemName = selectedItem.id;
				
				const isActive = this.dskStates?.[dskTabIdx]?.[dskItemName] || false;
				
				const displayText = `T${selectedDskTab}:${dskItemName}: ${isActive ? 'ON' : 'OFF'}`;
				
				const result = { text: displayText };
				if (isActive) {
					result.color = ColorWhite;
					result.bgcolor = ColorOrange; // Orange background when active
				}
				
				return result;
				
			} catch (error) {
				console.log('Error in dsk_item_active feedback:', error);
				return { text: `Item ${feedback.options.dskItemPosition}: Error` };
			}
		},
	}

	feedbacks['quick_cut_flash'] = {
		type: 'boolean',
		name: 'Quick Cut Flash',
		description: 'Shows a brief flash when a cut transition is performed',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [],
		callback: () => {
			// Only show for quick cuts
			return this.states.isQuickCut === true;
		},
	}

	feedbacks['media_tab_previous_flash'] = {
		type: 'boolean',
		name: 'Media Tab Previous Flash',
		description: 'Shows a brief flash when previous track is triggered',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorBlue,
		},
		options: [],
		callback: () => {
			return this.states.mediaTabPreviousFlash === true;
		},
	}

	feedbacks['media_tab_stop_flash'] = {
		type: 'boolean',
		name: 'Media Tab Stop Flash',
		description: 'Shows a brief flash when stop is triggered',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorRed,
		},
		options: [],
		callback: () => {
			return this.states.mediaTabStopFlash === true;
		},
	}

	feedbacks['media_tab_next_flash'] = {
		type: 'boolean',
		name: 'Media Tab Next Flash',
		description: 'Shows a brief flash when next track is triggered',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorBlue,
		},
		options: [],
		callback: () => {
			return this.states.mediaTabNextFlash === true;
		},
	}

	feedbacks['media_tab_loop_flash'] = {
		type: 'boolean',
		name: 'Media Tab Loop Flash',
		description: 'Shows a brief flash when loop is toggled',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorOrange,
		},
		options: [],
		callback: () => {
			return this.states.mediaTabLoopFlash === true;
		},
	}

	feedbacks['active_media_tab_track_loop'] = {
		type: 'boolean',
		name: 'Active Media Tab - Track Loop',
		description: 'If track loop is enabled for the currently selected media tab, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorBlue,
		},
		options: [],
		callback: () => {
			const activeMediaTab = this.getVariableValue('active_media_tab') || '1'
			const mediaSourceName = this.getVariableValue(`media_tab_${activeMediaTab}_source`)
			
			if (!mediaSourceName) {
				return false
			}
			
			if (!this.sources[mediaSourceName]) {
				return false
			}
			
			const source = this.sources[mediaSourceName]
			if (!source.inputKind || (source.inputKind !== 'ffmpeg_source' && source.inputKind !== 'vlc_source')) {
				return false
			}
			
			const validName = this.sources[mediaSourceName]?.validName ?? mediaSourceName
			return this.getVariableValue(`media_loop_state_${validName}`) === 'true'
		},
	}

	feedbacks['active_media_tab_playlist_loop'] = {
		type: 'boolean',
		name: 'Active Media Tab - Playlist Loop',
		description: 'If playlist loop is enabled for the currently selected media tab, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorOrange,
		},
		options: [],
		callback: () => {
			// get the currently active media tab
			const activeMediaTab = this.getVariableValue('active_media_tab') || '1'
			const mediaSourceName = this.getVariableValue(`media_tab_${activeMediaTab}_source`)
			
			if (!mediaSourceName) {
				return false
			}
			
			if (!this.sources[mediaSourceName]) {
				return false
			}
			
			const source = this.sources[mediaSourceName]
			if (!source.inputKind || (source.inputKind !== 'ffmpeg_source' && source.inputKind !== 'vlc_source')) {
				return false
			}
			
			const validName = this.sources[mediaSourceName]?.validName ?? mediaSourceName
			return this.getVariableValue(`media_playlist_loop_state_${validName}`) === 'true'
		},
	}

	feedbacks['active_media_tab_playing'] = {
		type: 'boolean',
		name: 'Active Media Tab - Playing',
		description: 'If media is currently playing for the active media tab, change the style of the button',
		defaultStyle: {
			color: ColorWhite,
			bgcolor: ColorGreen,
		},
		options: [],
		callback: () => {
			const activeMediaTab = this.getVariableValue('active_media_tab') || '1'
			const mediaSourceName = this.getVariableValue(`media_tab_${activeMediaTab}_source`)
			
			if (!mediaSourceName) {
				return false
			}
			
			if (!this.sources[mediaSourceName]) {
				return false
			}
			
			const source = this.sources[mediaSourceName]
			if (!source.inputKind || (source.inputKind !== 'ffmpeg_source' && source.inputKind !== 'vlc_source')) {
				return false
			}
			
			return this.mediaSources[mediaSourceName]?.mediaState === 'CRE8_MEDIA_STATE_PLAYING'
		},
	}

	return feedbacks
}

