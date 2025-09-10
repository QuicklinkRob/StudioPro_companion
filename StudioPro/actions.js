import hotkeys from './hotkeys.js'


export function getActions() {
	let actions = {}

	actions['enable_studio_mode'] = {
		name: 'Enable Studio Mode',
		options: [],
		callback: () => {
			this.sendRequest('SetStudioModeEnabled', { studioModeEnabled: true })
		},
	}
	actions['disable_studio_mode'] = {
		name: 'Disable Studio Mode',
		options: [],
		callback: () => {
			this.sendRequest('SetStudioModeEnabled', { studioModeEnabled: false })
		},
	}
	actions['toggle_studio_mode'] = {
		name: 'Toggle Studio Mode',
		options: [],
		callback: () => {
			this.sendRequest('SetStudioModeEnabled', { studioModeEnabled: this.states.studioMode ? false : true })
		},
	}
	actions['start_recording'] = {
		name: 'Start Recording',
		options: [],
		callback: () => {
			this.sendRequest('StartRecord')
		},
	}

	actions['toggle_ip'] = {
		name: 'Toggle Showing IP',
		options: [],
		callback: () => {
			this.toggleIP('ip4');
		},
	}
	actions['set_ip'] = {
		name: 'Set IP',
		options: [],
		callback: () => {
			this.updateNetwork('ipv4.addresses', 'ip4');
		},
	}
	actions['set_gateway'] = {
		name: 'Set Gateway',
		options: [],
		callback: () => {
			this.updateNetwork('ipv4.gateway', 'gateway');
		},
	}

	actions['set_dns'] = {
		name: 'Set DNS',
		options: [],
		callback: () => {
			this.updateNetwork('ipv4.dns', 'dns');
		},
	}

	actions['set_static'] = {
		name: 'Set Static Address',
		options: [],
		callback: () => {
			this.setStatic();
		},
	}

	actions['set_dynamic'] = {
		name: 'Set Dynamic Address',
		options: [],
		callback: () => {
			this.setDynamic();
		},
	}

	actions['toggle_gateway'] = {
		name: 'Toggle Showing Gateway',
		options: [],
		callback: () => {
			this.toggleIP('gateway');
		},
	}

	actions['check_network_method'] = {
		name: 'Check Network Method',
		options: [],
		callback: () => {
			this.updateNetworkMethod();
		},
	}

	actions['toggle_dns'] = {
		name: 'Toggle Showing DNS',
		options: [],
		callback: () => {
			this.toggleIP('dns');
		},
	}

	actions['stop_recording'] = {
		name: 'Stop Recording',
		options: [],
		callback: () => {
			this.sendRequest('StopRecord')
		},
	}
	actions['pause_recording'] = {
		name: 'Pause Recording',
		options: [],
		callback: () => {
			this.sendRequest('PauseRecord')
		},
	}
	actions['resume_recording'] = {
		name: 'Resume Recording',
		options: [],
		callback: () => {
			this.sendRequest('ResumeRecord')
		},
	}
	actions['ToggleRecordPause'] = {
		name: 'Toggle Recording Pause',
		options: [],
		callback: () => {
			this.sendRequest('ToggleRecordPause')
		},
	}
	actions['start_streaming'] = {
		name: 'Start Streaming',
		options: [],
		callback: () => {
			this.sendRequest('StartStream')
		},
	}
	actions['stop_streaming'] = {
		name: 'Stop Streaming',
		options: [],
		callback: () => {
			this.sendRequest('StopStream')
		},
	}
	actions['StartStopStreaming'] = {
		name: 'Toggle Streaming',
		options: [],
		callback: () => {
			this.sendRequest('ToggleStream')
		},
	}
	actions['start_replay_buffer'] = {
		name: 'Start Replay Buffer',
		options: [],
		callback: () => {
			this.sendRequest('StartReplayBuffer')
		},
	}
	actions['stop_replay_buffer'] = {
		name: 'Stop Replay Buffer',
		options: [],
		callback: () => {
			this.sendRequest('StopReplayBuffer')
		},
	}
	actions['save_replay_buffer'] = {
		name: 'Save Replay Buffer',
		options: [],
		callback: () => {
			this.sendRequest('SaveReplayBuffer')
		},
	}
	actions['ToggleReplayBuffer'] = {
		name: 'Toggle Replay Buffer',
		options: [],
		callback: () => {
			this.sendRequest('ToggleReplayBuffer')
		},
	}
	actions['set_scene'] = {
		name: 'Set Program Scene',
		options: [
			// {
			// 	type: 'dropdown',
			// 	label: 'Scene',
			// 	id: 'scene',
			// 	default: this.sceneListDefault,
			// 	choices: this.sceneChoicesCustomScene,
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
		callback: async (action) => {
				let sceneName;
				sceneName = this.getVariableValue(action.options.customSceneName);
				sceneName = sceneName ? sceneName.trim() : '';
				// this.log('debug', `Setting current preview scene to: "${sceneName}"`);
				// const scene = await this.parseVariablesInString(action.options.customSceneName)
				this.sendRequest('SetCurrentProgramScene', { sceneName: sceneName })
		},
	}

	actions['set_mix'] = {
		name: 'Set Mix Scene',
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
		callback: async (action) => {
			console.log('[MIX-ACTION] set_mix action triggered with options:', action.options)
			
			// Use the dropdown value directly, not as a variable lookup
			let sceneName = action.options.customSceneName;
			
			// If it's a variable reference, resolve it
			if (sceneName?.startsWith('$(')) {
				sceneName = this.getVariableValue(sceneName);
			}
			
			console.log('[MIX-ACTION] Scene name resolved:', {
				original: action.options.customSceneName,
				resolved: sceneName
			})
			
			sceneName = sceneName ? sceneName.trim() : '';
			const mixNumber = action.options.mixNumber;
			
			console.log(`Setting mix${mixNumber} to scene: ${sceneName}`)
			
			// Update the mix variable immediately for UI feedback
			this.setVariableValues({
				[`mix${mixNumber}`]: sceneName
			});

			console.log('Sending mix scene vendor request:', {
				mixNumber: parseInt(mixNumber),
				sceneName: sceneName
			})
			
			// Use vendor request instead of direct SetMixScene
			this.sendRequest('CallVendorRequest', {
				vendorName: "cre8-app-main-controls",
				requestType: 'setMixScene',
				requestData: {
					mixNumber: parseInt(mixNumber),
					sceneName: sceneName
				}
			});
		},
	}

	actions['preview_scene'] = {
		name: 'Set Preview Scene',
		options: [
			// {
			// 	type: 'dropdown',
			// 	label: 'Scene',
			// 	id: 'scene',
			// 	default: this.sceneListDefault,
			// 	choices: this.sceneChoicesCustomScene,
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
		callback: async (action) => {
            let sceneName;
			sceneName = this.getVariableValue(action.options.customSceneName);
            sceneName = sceneName ? sceneName.trim() : '';
            // this.log('debug', `Setting current preview scene to: "${sceneName}"`);
            if (sceneName && sceneName !== 'None') {
                this.sendRequest('SetCurrentPreviewScene', { sceneName });
			} else {
                this.log('error', `Invalid scene name provided: "${sceneName}"`);
			}
		},
	}

	actions['smart_switcher'] = {
		name: 'Smart Scene Switcher',
		description: 'Previews selected scene or, if scene is already in preview, transitions the scene to program',
		options: [
			{
				type: 'dropdown',
				label: 'Scene',
				id: 'scene',
				default: this.sceneListDefault,
				choices: this.sceneChoicesCustomScene,
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Custom Scene Name',
				id: 'customSceneName',
				default: '',
				isVisible: (options) => options.scene === 'customSceneName',
			},
		],
		callback: async (action) => {
			let scene = action.options.scene
			if (action.options.scene === 'customSceneName') {
				scene = await this.parseVariablesInString(action.options.customSceneName)
			}

			if (this.states.previewScene == scene && this.states.programScene != scene) {
				this.sendRequest('TriggerStudioModeTransition')
			} else {
				this.sendRequest('SetCurrentPreviewScene', { sceneName: scene })
			}
		},
	}
	actions['previewPreviousScene'] = {
		name: 'Preview Previous Scene',
		options: [],
		callback: () => {
			if (this.states.previewScene) {
				let previewScene = this.scenes.find((scene) => scene.sceneName === this.states.previewScene)
				let previousIndex = previewScene?.sceneIndex + 1
				let previousScene = this.scenes.find((scene) => scene.sceneIndex === previousIndex)
				if (previousScene) {
					this.sendRequest('SetCurrentPreviewScene', { sceneName: previousScene.sceneName })
				}
			}
		},
	}
	actions['previewNextScene'] = {
		name: 'Preview Next Scene',
		options: [],
		callback: () => {
			if (this.states.previewScene) {
				let previewScene = this.scenes.find((scene) => scene.sceneName === this.states.previewScene)
				let nextIndex = previewScene?.sceneIndex - 1
				let nextScene = this.scenes.find((scene) => scene.sceneIndex === nextIndex)
				if (nextScene) {
					this.sendRequest('SetCurrentPreviewScene', { sceneName: nextScene.sceneName })
				}
			}
		},
	}
	actions['do_transition'] = {
		name: 'Transition',
		description: 'Transitions preview to program in Studio Mode',
		options: [],
		callback: () => {
			if (this.states.studioMode) {
				this.sendRequest('TriggerStudioModeTransition')
			} else {
				this.log(
					'warn',
					'The Transition action requires CRE8 to be in Studio Mode. Try switching to Studio Mode, or using the Change Scene action instead'
				)
			}
		},
	}
	actions['quick_transition'] = {
		name: 'Quick Transition',
		description: 'Performs the selected transition and then returns to the default transition',
		options: [
			{
				type: 'dropdown',
				label: 'Transition',
				id: 'transition',
				default: this.transitionList?.[0] ? this.transitionList[0].id : '',
				// choices: this.transitionList,
				choices: this.transitionList?.filter(t => t.id !== 'Cut') || [],
			},
			{
				type: 'checkbox',
				label: 'Custom Duration',
				id: 'customDuration',
			},
			{
				type: 'number',
				label: 'Duration (in ms)',
				id: 'transition_time',
				default: 500,
				min: 0,
				max: 60 * 1000, //max is required by api
				range: false,
				isVisible: (options) => options.customDuration === true,
			},
		],
		callback: (action) => {
			if (action.options.transition == 'Default' && !action.options.customDuration) {
				this.sendRequest('TriggerStudioModeTransition')
			} else {
				let transitionWaitTime
				let transitionDuration
				let revertTransition = this.states.currentTransition
				let revertTransitionDuration = this.states.transitionDuration > 0 ? this.states.transitionDuration : 500

				if (action.options.transition == 'Cut') {
					transitionWaitTime = 100
				} else if (action.options.transition != 'Cut' && action.options.customDuration) {
					transitionWaitTime =
						action.options.transition_time > 50 ? action.options.transition_time + 100 : revertTransitionDuration + 100
				} else {
					transitionWaitTime = revertTransitionDuration + 100
				}

				if (action.options.customDuration) {
					transitionDuration =
						action.options.transition_time != null ? action.options.transition_time : revertTransitionDuration
				} else {
					transitionDuration = revertTransitionDuration
				}

				if (!this.states.transitionActive) {
					this.sendBatch([
						{
							requestType: 'SetCurrentSceneTransition',
							requestData: { transitionName: action.options.transition },
						},
						{
							requestType: 'SetCurrentSceneTransitionDuration',
							requestData: { transitionDuration: transitionDuration },
						},
						{
							requestType: 'TriggerStudioModeTransition',
						},
						{
							requestType: 'Sleep',
							requestData: { sleepMillis: transitionWaitTime },
						},
						{
							requestType: 'SetCurrentSceneTransition',
							requestData: { transitionName: revertTransition },
						},
						{
							requestType: 'SetCurrentSceneTransitionDuration',
							requestData: { transitionDuration: revertTransitionDuration },
						},
					])
				}
			}
		},
	}
	actions['set_transition'] = {
		name: 'Set Transition Type',
		options: [
			{
				type: 'dropdown',
				label: 'Transitions',
				id: 'transitions',
				default: this.transitionList?.[0] ? this.transitionList[0].id : '',
				choices: this.transitionList,
			},
		],
		callback: (action) => {
			this.sendRequest('SetCurrentSceneTransition', { transitionName: action.options.transitions })
		},
	}
	actions['set_transition_duration'] = {
		name: 'Set Transition Duration',
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
		callback: (action) => {
			this.sendRequest('SetCurrentSceneTransitionDuration', { transitionDuration: action.options.duration })
		},
	}
	actions['set_stream_settings'] = {
		name: 'Set Stream Settings',
		options: [
			{
				type: 'dropdown',
				label: 'Stream Type',
				id: 'streamType',
				choices: [
					{ id: 'rtmp_common', label: 'Preset Service' },
					{ id: 'rtmp_custom', label: 'Custom' },
				],
				default: 'rtmp_custom',
			},
			{
				type: 'textinput',
				label: 'Stream URL',
				id: 'streamURL',
				default: '',
				isVisible: (options) => options.streamType === 'rtmp_custom',
			},
			{
				type: 'textinput',
				label: 'Stream Key',
				id: 'streamKey',
				default: '',
			},
			{
				type: 'checkbox',
				label: 'Use Authentication',
				id: 'streamAuth',
				default: false,
				isVisible: (options) => options.streamType === 'rtmp_custom',
			},
			{
				type: 'textinput',
				label: 'User Name (Optional)',
				id: 'streamUserName',
				default: '',
				isVisible: (options) => options.streamType === 'rtmp_custom',
			},
			{
				type: 'textinput',
				label: 'Password (Optional)',
				id: 'streamPassword',
				default: '',
				isVisible: (options) => options.streamType === 'rtmp_custom',
			},
		],
		callback: (action) => {
			let streamServiceSettings = {
				key: action.options.streamKey,
				server: action.options.streamURL,
				use_auth: action.options.streamAuth,
				username: action.options.streamUserName,
				password: action.options.streamPassword,
			}
			let streamServiceType = action.options.streamType

			this.sendRequest('SetStreamServiceSettings', {
				streamServiceType: streamServiceType,
				streamServiceSettings: streamServiceSettings,
			})
		},
	}
	actions['SendStreamCaption'] = {
		name: 'Send Stream Caption',
		options: [
			{
				type: 'textinput',
				useVariables: true,
				label: 'Caption Text',
				id: 'text',
				default: '',
			},
		],
		callback: async (action) => {
			if (this.states.streaming) {
				let captionText = await this.parseVariablesInString(action.options.customSceneName)
				this.sendRequest('SendStreamCaption', { captionText: captionText })
			}
		},
	}
	actions['StartStopRecording'] = {
		name: 'Toggle Recording',
		options: [],
		callback: () => {
			this.sendRequest('ToggleRecord')
		},
	}
	actions['set_source_mute'] = {
		name: 'Set Source Mute',
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
				label: 'Mute',
				id: 'mute',
				default: 'true',
				choices: [
					{ id: 'false', label: 'False' },
					{ id: 'true', label: 'True' },
				],
			},
		],
		callback: (action) => {
			this.sendRequest('SetInputMute', {
				inputName: action.options.source,
				inputMuted: action.options.mute == 'true' ? true : false,
			})
		},
	}
	actions['toggle_source_mute'] = {
		name: 'Toggle Source Mute',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
		],
		callback: (action) => {
			this.sendRequest('ToggleInputMute', { inputName: action.options.source })
		},
	}
	actions['set_volume'] = {
		name: 'Set Source Volume',
		description: 'Sets the volume of a source to a specific value',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
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
		callback: (action) => {
			this.sendRequest('SetInputVolume', { inputName: action.options.source, inputVolumeDb: action.options.volume })
		},
	}
	actions['adjust_volume'] = {
		name: 'Adjust Source Volume (dB)',
		description: 'Adjusts the volume of a source by a specific increment',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
			{
				type: 'number',
				label: 'Volume adjustment amount in dB',
				id: 'volume',
				default: 0,
				range: false,
			},
		],
		callback: (action) => {
			let newVolume = this.sources[action.options.source].inputVolume + action.options.volume
			this.log('newVolume', newVolume);
			if (newVolume > 26) {
				newVolume = 26
			} else if (newVolume < -100) {
				newVolume = -100
			}

			this.sendRequest('SetInputVolume', { inputName: action.options.source, inputVolumeDb: newVolume })
			this.log('newVolume', newVolume);
		},
	}

	actions['adjust_volume_percent'] = {
		name: 'Adjust Source Volume (Percentage)',
		description: 'Adjusts the volume of a source based on a percentage of the CRE8 volume slider',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
			{
				type: 'number',
				label: 'Percent Adjustment',
				id: 'percent',
				default: 0,
				min: -100,
				max: 100,
				range: true,
			},
		],
		callback: (action) => {
			//Standard offset values (aka how the CRE8 code determines slider percentage)
			let LOG_RANGE_DB = 96.0
			let LOG_OFFSET_DB = 6.0
			let LOG_OFFSET_VAL = -0.77815125038364363
			let LOG_RANGE_VAL = -2.00860017176191756

			//Calculate current "percent" of volume slider in CRE8
			let dB = this.sources[action.options.source].inputVolume
			let currentPercent = 0.0
			if (dB >= 0.0) {
				currentPercent = 100.0
			} else if (dB <= -96.0) {
				currentPercent = 0.0
			} else {
				currentPercent = ((-Math.log10(-dB + 6.0) - LOG_RANGE_VAL) / (LOG_OFFSET_VAL - LOG_RANGE_VAL)) * 100.0
			}

			//Calculate new "percent" of volume slider
			let percentAdjustment = Math.abs(action.options.percent)

			let newPercent
			if (action.options.percent > 0) {
				newPercent = currentPercent + percentAdjustment
			} else {
				newPercent = currentPercent - percentAdjustment
			}
			newPercent = newPercent / 100
			let newDb
			if (newPercent >= 1.0) {
				newDb = 0.0
			} else if (newPercent <= 0.0) {
				newDb = -100.0
			} else {
				newDb =
					-(LOG_RANGE_DB + LOG_OFFSET_DB) * Math.pow((LOG_RANGE_DB + LOG_OFFSET_DB) / LOG_OFFSET_DB, -newPercent) +
					LOG_OFFSET_DB
			}

			this.sendRequest('SetInputVolume', { inputName: action.options.source, inputVolumeDb: newDb })
		},
	}
	actions['setSyncOffset'] = {
		name: 'Set Audio Sync Offset',
		description: 'Sets the sync offset of an audio source',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
			{
				type: 'number',
				label: 'Sync Offset in ms (-950 to 20000)',
				id: 'offset',
				default: 0,
				min: -950,
				max: 20000,
				range: false,
			},
		],
		callback: (action) => {
			this.sendRequest('SetInputAudioSyncOffset', {
				inputName: action.options.source,
				inputAudioSyncOffset: action.options.offset,
			})
		},
	}
	actions['setAudioBalance'] = {
		name: 'Set Audio Balance',
		description: 'Sets the balance of an audio source',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.audioSourceListDefault,
				choices: this.audioSourceList,
			},
			{
				type: 'number',
				label: 'Balance (Left 0.0 to 1.0 Right)',
				id: 'balance',
				default: 0.5,
				min: 0.0,
				max: 1.0,
				range: false,
			},
		],
		callback: (action) => {
			this.sendRequest('SetInputAudioBalance', {
				inputName: action.options.source,
				inputAudioBalance: action.options.balance,
			})
		},
	}
	actions['toggle_scene_item'] = {
		name: 'Set Source Visibility',
		description: 'Set or toggle the visibility of a source within a scene',
		options: [
			{
				type: 'dropdown',
				label: 'Scene (optional, defaults to current scene)',
				id: 'scene',
				default: 'Current Scene',
				choices: this.sceneChoicesProgramPreview,
				allowCustom: true,
			},
			{
				type: 'checkbox',
				label: 'All Sources',
				id: 'all',
				default: false,
			},
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
				allowCustom: true,
				isVisible: (options) => options.all === false,
			},
			{
				type: 'dropdown',
				label: 'Visible',
				id: 'visible',
				default: 'toggle',
				choices: [
					{ id: 'false', label: 'False' },
					{ id: 'true', label: 'True' },
					{ id: 'toggle', label: 'Toggle' },
				],
			},
		],
		callback: async (action) => {
			let sceneName = await this.parseVariablesInString(action.options.scene)
			let sourceName = await this.parseVariablesInString(action.options.source)
			let enabled = true
			let requests = []

			// special scene names
			if (sceneName === 'Current Scene') {
				sceneName = this.states.programScene
			} else if (sceneName === 'Preview Scene') {
				sceneName = this.states.previewScene
			}

			if (this.sources[sourceName]?.groupedSource) {
				let group = this.sources[sourceName].groupName
				let source = this.groups[group].find((item) => item.sourceName === sourceName)
				if (action.options.visible === 'toggle') {
					enabled = !source.sceneItemEnabled
				} else {
					enabled = action.options.visible == 'true' ? true : false
				}
				this.sendRequest('SetSceneItemEnabled', {
					sceneName: source.groupName,
					sceneItemId: source.sceneItemId,
					sceneItemEnabled: enabled,
				})
			}
			let targetScene = this.sceneItems[sceneName]
			if (targetScene) {
				targetScene.forEach((source) => {
					if (action.options.all || source.sourceName === sourceName) {
						if (action.options.visible === 'toggle') {
							enabled = !source.sceneItemEnabled
						} else {
							enabled = action.options.visible == 'true' ? true : false
						}
						requests.push({
							requestType: 'SetSceneItemEnabled',
							requestData: {
								sceneName: sceneName,
								sceneItemId: source.sceneItemId,
								sceneItemEnabled: enabled,
							},
						})

						if (source.isGroup && action.options.all) {
							for (let x in this.groups[source.sourceName]) {
								let item = this.groups[source.sourceName][x]
								let groupEnabled
								if (action.options.visible === 'toggle') {
									groupEnabled = !this.sources[item.sourceName].sceneItemEnabled
								} else {
									groupEnabled = action.options.visible == 'true' ? true : false
								}
								requests.push({
									requestType: 'SetSceneItemEnabled',
									requestData: {
										sceneName: source.sourceName,
										sceneItemId: item.sceneItemId,
										sceneItemEnabled: groupEnabled,
									},
								})
							}
						}
					}
				})
				this.sendBatch(requests)
			}
		},
	}
	actions['setText'] = {
		name: 'Set Source Text',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.textSourceList?.[0] ? this.textSourceList[0].id : 'None',
				choices: this.textSourceList,
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Text',
				id: 'text',
			},
		],
		callback: async (action) => {
			let newText = await this.parseVariablesInString(action.options.text)

			this.sendRequest('SetInputSettings', { inputName: action.options.source, inputSettings: { text: newText } })
		},
	}
	actions['trigger-hotkey'] = {
		name: 'Trigger Hotkey by ID',
		options: [
			{
				type: 'dropdown',
				label: 'Hotkey ID',
				id: 'id',
				default: 'CRE8Basic.StartRecording',
				choices: this.hotkeyNames,
			},
		],
		callback: (action) => {
			this.sendRequest('TriggerHotkeyByName', { hotkeyName: action.options.id })
		},
	}
	actions['trigger-hotkey-sequence'] = {
		name: 'Trigger Hotkey by Key',
		options: [
			{
				type: 'dropdown',
				label: 'Key',
				id: 'keyId',
				default: 'CRE8_KEY_A',
				choices: hotkeys,
			},
			{
				type: 'checkbox',
				label: 'Shift',
				id: 'keyShift',
				default: false,
			},
			{
				type: 'checkbox',
				label: 'Alt / Option',
				id: 'keyAlt',
				default: false,
			},
			{
				type: 'checkbox',
				label: 'Control',
				id: 'keyControl',
				default: false,
			},
			{
				type: 'checkbox',
				label: 'Command (Mac)',
				id: 'keyCommand',
				default: false,
			},
		],
		callback: (action) => {
			let keyModifiers = {
				shift: action.options.keyShift,
				alt: action.options.keyAlt,
				control: action.options.keyControl,
				command: action.options.keyCommand,
			}

			this.sendRequest('TriggerHotkeyByKeySequence', {
				keyId: action.options.keyId,
				keyModifiers: keyModifiers,
			})
		},
	}
	actions['set_profile'] = {
		name: 'Set Profile',
		options: [
			{
				type: 'dropdown',
				label: 'Profile',
				id: 'profile',
				default: this.profileChoicesDefault,
				choices: this.profileChoices,
			},
		],
		callback: (action) => {
			this.sendRequest('SetCurrentProfile', { profileName: action.options.profile })
		},
	}
	actions['set_scene_collection'] = {
		name: 'Set Scene Collection',
		options: [
			{
				type: 'dropdown',
				label: 'Scene Collection',
				id: 'scene_collection',
				default: this.sceneCollectionList?.[0] ? this.sceneCollectionList[0].id : '',
				choices: this.sceneCollectionList,
			},
		],
		callback: (action) => {
			this.sendRequest('SetCurrentSceneCollection', { sceneCollectionName: action.options.scene_collection })
		},
	}
	actions['start_output'] = {
		name: 'Start Output',
		options: [
			{
				type: 'dropdown',
				label: 'Output',
				id: 'output',
				default: 'virtualcam_output',
				choices: this.outputList,
			},
		],
		callback: (action) => {
			if (action.options.output === 'virtualcam_output') {
				this.sendRequest('StartVirtualCam')
			} else {
				this.sendRequest('StartOutput', {
					outputName: action.options.output,
				})
			}
		},
	}
	actions['stop_output'] = {
		name: 'Stop Output',
		options: [
			{
				type: 'dropdown',
				label: 'Output',
				id: 'output',
				default: 'virtualcam_output',
				choices: this.outputList,
			},
		],
		callback: (action) => {
			if (action.options.output === 'virtualcam_output') {
				this.sendRequest('StopVirtualCam')
			} else {
				this.sendRequest('StopOutput', {
					outputName: action.options.output,
				})
			}
		},
	}
	actions['start_stop_output'] = {
		name: 'Toggle Output',
		options: [
			{
				type: 'dropdown',
				label: 'Output',
				id: 'output',
				default: 'virtualcam_output',
				choices: this.outputList,
			},
		],
		callback: (action) => {
			if (action.options.output === 'virtualcam_output') {
				this.sendRequest('ToggleVirtualCam')
			} else {
				this.sendRequest('ToggleOutput', {
					outputName: action.options.output,
				})
			}
		},
	}
	actions['refresh_browser_source'] = {
		name: 'Refresh Browser Source',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
			},
		],
		callback: (action) => {
			if (this.sources[action.options.source]?.inputKind == 'browser_source') {
				this.sendRequest('PressInputPropertiesButton', {
					inputName: action.options.source,
					propertyName: 'refreshnocache',
				})
			}
		},
	}
	actions['set_audio_monitor'] = {
		name: 'Set Audio Monitor',
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
					{ id: 'none', label: 'Monitor Off' },
					{ id: 'monitorOnly', label: 'Monitor Only' },
					{ id: 'monitorAndOutput', label: 'Monitor and Output' },
				],
			},
		],
		callback: (action) => {
			let monitorType
			if (action.options.monitor === 'monitorAndOutput') {
				monitorType = 'CRE8_MONITORING_TYPE_MONITOR_AND_OUTPUT'
			} else if (action.options.monitor === 'monitorOnly') {
				monitorType = 'CRE8_MONITORING_TYPE_MONITOR_ONLY'
			} else {
				monitorType = 'CRE8_MONITORING_TYPE_NONE'
			}
			this.sendRequest('SetInputAudioMonitorType', { inputName: action.options.source, monitorType: monitorType })
		},
	}
	actions['take_screenshot'] = {
		name: 'Take Screenshot',
		options: [
			{
				type: 'dropdown',
				label: 'Format',
				id: 'format',
				default: 'png',
				choices: this.imageFormats,
			},
			{
				type: 'number',
				label: 'Compression Quality (1-100, 0 is automatic)',
				id: 'compression',
				default: 0,
				min: 0,
				max: 100,
				range: false,
			},
			{
				type: 'dropdown',
				label: 'Source (Optional, default is current scene)',
				id: 'source',
				default: 'programScene',
				choices: [
					{ id: 'programScene', label: 'Current Scene' },
					{ id: 'custom', label: 'Custom' },
				],
			},
			{
				type: 'dropdown',
				label: 'Custom Source / Scene',
				id: 'custom',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
				isVisible: (options) => options.source === 'custom',
			},
			{
				type: 'textinput',
				label: 'Custom File Path (Optional, default is recording path)',
				id: 'path',
			},
		],
		callback: (action) => {
			let date = new Date().toISOString()
			let day = date.slice(0, 10)
			let time = date.slice(11, 19).replace(/:/g, '-')

			let fileName = action.options.source === 'programScene' ? this.states.programScene : action.options.custom
			let fileLocation = action.options.path ? action.options.path : this.states.recordDirectory
			let filePath = fileLocation + '/' + day + '_' + fileName + '_' + time + '.' + action.options.format
			let quality = action.options.compression == 0 ? -1 : action.options.compression

			this.sendRequest('SaveSourceScreenshot', {
				sourceName: fileName,
				imageFormat: action.options.format,
				imageFilePath: filePath,
				imageCompressionQuality: quality,
			})
		},
	}
	actions['toggle_filter'] = {
		name: 'Set Filter Visibility',
		options: [
			{
				type: 'dropdown',
				label: 'Source / Scene',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoicesWithScenes,
				allowCustom: true,
			},
			{
				type: 'checkbox',
				label: 'All Filters',
				id: 'all',
				default: false,
			},
			{
				type: 'dropdown',
				label: 'Filter',
				id: 'filter',
				default: this.filterListDefault,
				choices: this.filterList,
				allowCustom: true,
				isVisible: (options) => options.all === false,
			},
			{
				type: 'dropdown',
				label: 'Visibility',
				id: 'visible',
				default: 'toggle',
				choices: [
					{ id: 'toggle', label: 'Toggle' },
					{ id: 'true', label: 'On' },
					{ id: 'false', label: 'Off' },
				],
			},
		],
		callback: async (action) => {
			let source = await this.parseVariablesInString(action.options.source)
			let filterName = await this.parseVariablesInString(action.options.filter)

			let sourceFilterList = this.sourceFilters[source]
			if (action.options.all) {
				let requests = []
				sourceFilterList.forEach((filter) => {
					let name = filter.filterName
					let filterVisibility
					if (action.options.visible !== 'toggle') {
						filterVisibility = action.options.visible === 'true' ? true : false
					} else if (action.options.visible === 'toggle') {
						filterVisibility = !filter.filterEnabled
					}
					requests.push({
						requestType: 'SetSourceFilterEnabled',
						requestData: { sourceName: source, filterName: name, filterEnabled: filterVisibility },
					})
				})

				this.sendBatch(requests)
			} else {
				let filterVisibility
				if (action.options.visible !== 'toggle') {
					filterVisibility = action.options.visible === 'true' ? true : false
				} else if (action.options.visible === 'toggle') {
					if (sourceFilterList) {
						let filter = sourceFilterList.find((item) => item.filterName === filterName)
						if (filter) {
							filterVisibility = !filter.filterEnabled
						}
					}
				}

				this.sendRequest('SetSourceFilterEnabled', {
					sourceName: source,
					filterName: filterName,
					filterEnabled: filterVisibility,
				})
			}
		},
	}
	actions['setFilterSettings'] = {
		name: 'Set Filter Settings',
		options: [
			{
				type: 'dropdown',
				label: 'Source / Scene',
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
			{
				type: 'textinput',
				label: 'Filter Settings',
				id: 'settings',
				default: '{"left": 100, "top": 0, "right": 100, "bottom": 0}',
				tooltip: 'Must be a JSON object with the settings for the filter',
			},
		],
		callback: (action) => {
			try {
				let settings = JSON.parse(action.options.settings)
				this.sendRequest('SetSourceFilterSettings', {
					sourceName: action.options.source,
					filterName: action.options.filter,
					filterSettings: settings,
				})
			} catch (e) {
				this.log('warn', `Error parsing JSON for Set Filter Settings (${e.message})`)
				return
			}
		},
	}

	actions['toggle_track_loop'] = {
		name: 'Toggle Track Loop',
		description: 'enable, disable, or toggle track loop mode for media source',
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: 'currentMedia',
				choices: this.mediaSourceListCurrentMedia,
			},
			{
				type: 'dropdown',
				label: 'Loop Action',
				id: 'loopAction',
				default: 'toggle',
				choices: [
					{ id: 'toggle', label: 'Toggle' },
					// { id: 'enable', label: 'Enable Loop' },
					// { id: 'disable', label: 'Disable Loop' },
				],
			},
		],
		callback: async (action) => {
			// determine media source
			let media = action.options.source === 'currentMedia' ? this.states.currentMedia : action.options.source
			if (!media && action.options.source === 'currentMedia') {
				const activeMediaTab = this.getVariableValue('active_media_tab') || '1'
				media = this.getVariableValue(`media_tab_${activeMediaTab}_source`)
			}
			
			if (!media) {
				this.log('warn', 'no media source available for track loop action')
				return
			}

			try {
				let mediaStatus = null
				for (let attempt = 1; attempt <= 3; attempt++) {
					mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: media })
					if (mediaStatus?.playlist?.length > 0) break
					if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 300))
				}
				
				if (!mediaStatus?.playlist?.length) {
					this.log('warn', `no playlist available for ${media}`)
					return
				}
				this.log('debug', `media status for ${media}: ${JSON.stringify(mediaStatus)}`)
				// get current track from mediaCurrentIndex
				const currentIndex = mediaStatus.mediaCurrentIndex || 0
				const currentTrack = mediaStatus.playlist[currentIndex]
				
				if (!currentTrack) {
					this.log('warn', `no current track found at index ${currentIndex} for ${media}`)
					return
				}
				
				// use track path/name as inputName for the trigger request
				const trackInputName = currentTrack.displayName || `${media}_track_${currentIndex}`

				// toggle loop state and send request
				const currentLoopState = mediaStatus.mediaLoop || false
				const newLoopState = !currentLoopState
				this.log('debug', `current loop state for ${media}: ${currentLoopState}, setting to ${newLoopState}`)
				this.log('info', `sending loop state change for ${media} (track index ${currentIndex}): ${newLoopState}`)

				await this.sendRequest('TriggerMediaInputAction', {
					inputName: media,
					mediaAction: 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_LOOP',
					loop: newLoopState
				})
				
				this.log('debug', `toggled track loop for ${media}: ${currentLoopState} -> ${newLoopState}`)

				// update the variable for feedback
				const validName = this.sources[media]?.validName ?? media
				this.setVariableValues({
					[`media_loop_state_${validName}`]: newLoopState ? 'true' : 'false'
				})
				this.log('debug', `updated variable media_loop_state_${validName} to ${newLoopState ? 'true' : 'false'}`)

				// trigger feedback updates
				this.checkFeedbacks()

				// get the media status to confirm
				const updatedStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: media })
				this.log('debug', `updated media status for ${media}: ${JSON.stringify(updatedStatus)}`)
				
			} catch (error) {
				this.log('error', `track loop action failed: ${error.message}`)
			}
		},
	}

	actions['toggle_playlist_loop'] = {
		name: 'Toggle Playlist Loop',
		description: 'enable, disable, or toggle playlist loop mode for media source',
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: 'currentMedia',
				choices: this.mediaSourceListCurrentMedia,
			},
			{
				type: 'dropdown',
				label: 'Loop Action',
				id: 'loopAction',
				default: 'toggle',
				choices: [
					{ id: 'toggle', label: 'Toggle' },
					// { id: 'enable', label: 'Enable Loop' },
					// { id: 'disable', label: 'Disable Loop' },
				],
			},
		],
		callback: async (action) => {
			let media = action.options.source === 'currentMedia' ? this.states.currentMedia : action.options.source
			if (!media && action.options.source === 'currentMedia') {
				const activeMediaTab = this.getVariableValue('active_media_tab') || '1'
				media = this.getVariableValue(`media_tab_${activeMediaTab}_source`)
			}
			
			if (!media) {
				this.log('warn', 'no media source available for playlist loop action')
				return
			}

			try {
				// wait for media status to load
				let mediaStatus = null
				for (let attempt = 1; attempt <= 3; attempt++) {
					mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: media })
					if (mediaStatus?.playlist?.length > 0) break
					if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 300))
				}
				
				if (!mediaStatus?.playlist?.length) {
					this.log('warn', `no playlist available for ${media}`)
					return
				}
				this.log('debug', `media status for ${media}: ${JSON.stringify(mediaStatus)}`)
				
				const currentPlaylistLoopState = mediaStatus.playlistLoop || false
				const newPlaylistLoopState = !currentPlaylistLoopState
				this.log('debug', `current playlist loop state for ${media}: ${currentPlaylistLoopState}, setting to ${newPlaylistLoopState}`)
				this.log('info', `sending playlist loop state change for ${media}: ${newPlaylistLoopState}`)

				await this.sendRequest('TriggerMediaInputAction', {
					inputName: media,
					mediaAction: 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_PLAYLIST_LOOP',
					playlistLoop: newPlaylistLoopState
				})
				
				this.log('debug', `toggled playlist loop for ${media}: ${currentPlaylistLoopState} -> ${newPlaylistLoopState}`)
				
				// update the variable for feedback
				const validName = this.sources[media]?.validName ?? media
				this.setVariableValues({
					[`media_playlist_loop_state_${validName}`]: newPlaylistLoopState ? 'true' : 'false'
				})
				this.log('debug', `updated variable media_playlist_loop_state_${validName} to ${newPlaylistLoopState ? 'true' : 'false'}`)

				// trigger feedback updates
				this.checkFeedbacks()
				
				await new Promise(resolve => setTimeout(resolve, 100))

				const updatedStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: media })
				this.log('debug', `updated media status for ${media}: ${JSON.stringify(updatedStatus)}`)
				
			} catch (error) {
				this.log('error', `playlist loop action failed: ${error.message}`)
			}
		},
	}

	actions['toggle_auto_advance'] = {
		name: 'Toggle Auto Advance',
		description: 'Toggle automatic progression (may require settings update)',
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: 'currentMedia',
				choices: this.mediaSourceListCurrentMedia,
			},
		],
		callback: (action) => {
			const sourceName = action.options.source === 'currentMedia' ? this.states.currentMedia : action.options.source
			const validName = this.sources[sourceName]?.validName ?? sourceName
			
			this.sendRequest('SetInputSettings', {
				inputName: sourceName,
				inputSettings: { 
					auto_advance: !(this.getVariableValue(`media_auto_advance_${validName}`) === 'true')
				}
			})
		},
	}

	// Media Tab Management Actions
	actions['select_media_tab'] = {
		name: 'Select Media Tab',
		description: 'Switch to a specific media tab for control',
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
		callback: async (action) => {
			// set the active media tab
			this.setVariableValues({
				active_media_tab: action.options.mediaTab
			})

			this.log('debug', `selected media tab ${action.options.mediaTab} as active`)

			// Trigger feedback updates for tab selection
			this.checkFeedbacks()

			// log media tab selection and check if source is configured
			const mediaSourceName = this.getVariableValue(`media_tab_${action.options.mediaTab}_source`)
			this.log('debug', `active media tab ${action.options.mediaTab} - source: ${mediaSourceName || 'not configured'}`)
			
			// show available media sources for configuration if none is configured
			if (!mediaSourceName) {
				const availableMediaSources = this.mediaSourceList?.map(source => source.id) || []
				this.log('info', `available media sources for configuration: [${availableMediaSources.join(', ') || 'none detected'}]`)
				this.log('info', `to configure this tab, use the "configure media tab source" action and select from available sources`)
				
				// also log all current tab configurations for reference
				const tabConfigs = []
				for (let i = 1; i <= 5; i++) {
					const source = this.getVariableValue(`media_tab_${i}_source`) || 'not configured'
					tabConfigs.push(`tab ${i}: ${source}`)
				}
				this.log('debug', `current tab configurations: ${tabConfigs.join(', ')}`)
			} else {
				// check media status for the selected tab and update loop state variables
				try {
					const mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: mediaSourceName })
					this.log('debug', `getmediaplayerinputstatus for selected tab ${action.options.mediaTab} (${mediaSourceName}):`, JSON.stringify(mediaStatus, null, 2))
					
					// update loop state variables with current values from API
					const validName = this.sources[mediaSourceName]?.validName ?? mediaSourceName
					const trackLoopState = mediaStatus.mediaLoop || false
					const playlistLoopState = mediaStatus.mediaPlaylistLoop || false
					
					this.setVariableValues({
						[`media_loop_state_${validName}`]: trackLoopState ? 'true' : 'false',
						[`media_playlist_loop_state_${validName}`]: playlistLoopState ? 'true' : 'false'
					})
					
					// update media state for play/pause feedback
					if (!this.mediaSources[mediaSourceName]) {
						this.mediaSources[mediaSourceName] = {}
					}
					this.mediaSources[mediaSourceName].mediaState = mediaStatus.mediaState || 'CRE8_MEDIA_STATE_STOPPED'
					
					this.log('debug', `updated variables for ${mediaSourceName}: track=${trackLoopState}, playlist=${playlistLoopState}, state=${mediaStatus.mediaState}`)
					
					// trigger feedback updates after updating variables
					this.checkFeedbacks()
					
				} catch (error) {
					this.log('warn', `failed to get media status for selected tab ${action.options.mediaTab} (${mediaSourceName}): ${error.message}`)
				}
			}
		},
	}

	actions['media_tab_play_pause'] = {
		name: 'Media Tab Play/Pause',
		description: 'Play/pause the currently selected media tab',
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: 'current',
				choices: [
					{ id: 'current', label: '<CURRENT TAB>' },
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
		],
		callback: async (action) => {
			// get the target tab
			const targetTab = action.options.mediaTab === 'current' ? 
				this.getVariableValue('active_media_tab') || '1' : 
				action.options.mediaTab

			this.log('debug', `media tab action requested for tab: ${action.options.mediaTab}, resolved to: ${targetTab}`)

			// get the media source for this tab
			const mediaSourceName = this.getVariableValue(`media_tab_${targetTab}_source`)
			if (!mediaSourceName) {
				this.log('warn', `no media source configured for media tab ${targetTab}`)
				return
			}

			// log and check media status before triggering action
			this.log('debug', `media tab ${targetTab} play/pause - checking status for source: ${mediaSourceName}`)
			
			let mediaStatus = null
			try {
				mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: mediaSourceName })
				if (mediaStatus && Object.keys(mediaStatus).length > 0) {
					this.log('debug', `getmediaplayerinputstatus response for ${mediaSourceName}:`, JSON.stringify(mediaStatus, null, 2))
				} else {
					this.log('debug', `getmediaplayerinputstatus returned empty response for ${mediaSourceName}, trying getmediainputstatus`)
					try {
						mediaStatus = await this.sendRequest('GetMediaInputStatus', { inputName: mediaSourceName })
						this.log('debug', `getmediainputstatus response for ${mediaSourceName}:`, JSON.stringify(mediaStatus, null, 2))
					} catch (fallbackError) {
						this.log('warn', `both getmediaplayerinputstatus and getmediainputstatus failed for ${mediaSourceName}`)
					}
				}
			} catch (error) {
				this.log('warn', `getmediaplayerinputstatus failed for ${mediaSourceName}: ${error.message}`)
			}

			let playPause = 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE'
			let newState = 'CRE8_MEDIA_STATE_STOPPED'
			
			if (this.mediaSources[mediaSourceName]?.mediaState == 'CRE8_MEDIA_STATE_PLAYING') {
				playPause = 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE'
				newState = 'CRE8_MEDIA_STATE_PAUSED'
			} else {
				playPause = 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY'
				newState = 'CRE8_MEDIA_STATE_PLAYING'
			}
			
			this.log('debug', `media tab ${targetTab} - sending action ${playPause} to ${mediaSourceName}`)
			
			try {
				this.log('debug', `attempting triggermediainputaction for ${mediaSourceName}`)
				await this.sendRequest('TriggerMediaInputAction', {
					inputName: mediaSourceName,
					mediaAction: playPause,
				})
				this.log('debug', `triggermediainputaction succeeded for ${mediaSourceName}`)
				
				// Update the media state immediately after successful action
				if (!this.mediaSources[mediaSourceName]) {
					this.mediaSources[mediaSourceName] = {}
				}
				this.mediaSources[mediaSourceName].mediaState = newState
				
				// Trigger feedback updates after successful action
				this.checkFeedbacks()
			} catch (fallbackError) {
				this.log('error', `triggermediainputaction failed for ${mediaSourceName}: ${fallbackError.message}`)
			}
		},
	}

	actions['media_tab_stop'] = {
		name: 'Media Tab Stop',
		description: 'Stop playback for the specified media tab',
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: 'current',
				choices: [
					{ id: 'current', label: '<CURRENT TAB>' },
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
		],
		callback: async (action) => {
			const targetTab = action.options.mediaTab === 'current' ? 
				this.getVariableValue('active_media_tab') || '1' : 
				action.options.mediaTab

			const mediaSourceName = this.getVariableValue(`media_tab_${targetTab}_source`)
			if (!mediaSourceName) {
				this.log('warn', `No media source configured for Media Tab ${targetTab}`)
				return
			}

			// log and check media status before triggering action
			this.log('debug', `media tab ${targetTab} stop - checking status for source: ${mediaSourceName}`)
			
			try {
				const mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: mediaSourceName })
				this.log('debug', `getmediaplayerinputstatus response for ${mediaSourceName}:`, JSON.stringify(mediaStatus, null, 2))
			} catch (error) {
				this.log('warn', `failed to get media status for ${mediaSourceName}: ${error.message}`)
			}

			// Flash feedback
			this.states.mediaTabStopFlash = true
			this.checkFeedbacks('media_tab_stop_flash')
			setTimeout(() => {
				this.states.mediaTabStopFlash = false
				this.checkFeedbacks('media_tab_stop_flash')
			}, 200)

			this.log('debug', `media tab ${targetTab} - sending stop action to ${mediaSourceName}`)

			// note: triggermediaplayerinputaction not implemented in this cre8 version
			try {
				this.log('debug', `attempting triggermediainputaction for ${mediaSourceName}`)
				await this.sendRequest('TriggerMediaInputAction', {
					inputName: mediaSourceName,
					mediaAction: 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_STOP',
				})
				this.log('debug', `triggermediainputaction succeeded for ${mediaSourceName}`)
				
				// Update the media state immediately after successful action
				if (!this.mediaSources[mediaSourceName]) {
					this.mediaSources[mediaSourceName] = {}
				}
				this.mediaSources[mediaSourceName].mediaState = 'CRE8_MEDIA_STATE_STOPPED'
				
				// Trigger feedback updates after successful action
				this.checkFeedbacks()
			} catch (error) {
				this.log('error', `triggermediainputaction failed for ${mediaSourceName}: ${error.message}`)
			}
		},
	}

	actions['media_tab_next'] = {
		name: 'Media Tab Next',
		description: 'Next track for the specified media tab',
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: 'current',
				choices: [
					{ id: 'current', label: '<CURRENT TAB>' },
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
		],
		callback: async (action) => {
			const targetTab = action.options.mediaTab === 'current' ? 
				this.getVariableValue('active_media_tab') || '1' : 
				action.options.mediaTab

			const mediaSourceName = this.getVariableValue(`media_tab_${targetTab}_source`)
			if (!mediaSourceName) {
				this.log('warn', `No media source configured for Media Tab ${targetTab}`)
				return
			}

			// log and check media status before triggering action
			this.log('debug', `media tab ${targetTab} next - checking status for source: ${mediaSourceName}`)
			
			try {
				const mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: mediaSourceName })
				this.log('debug', `getmediaplayerinputstatus response for ${mediaSourceName}:`, JSON.stringify(mediaStatus, null, 2))
			} catch (error) {
				this.log('warn', `failed to get media status for ${mediaSourceName}: ${error.message}`)
			}

			// Flash feedback
			this.states.mediaTabNextFlash = true
			this.checkFeedbacks('media_tab_next_flash')
			setTimeout(() => {
				this.states.mediaTabNextFlash = false
				this.checkFeedbacks('media_tab_next_flash')
			}, 200)

			this.log('debug', `media tab ${targetTab} - sending next action to ${mediaSourceName}`)

			// note: triggermediaplayerinputaction not implemented in this cre8 version
			try {
				this.log('debug', `attempting triggermediainputaction for ${mediaSourceName}`)
				await this.sendRequest('TriggerMediaInputAction', {
					inputName: mediaSourceName,
					mediaAction: 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_NEXT',
				})
				this.log('debug', `triggermediainputaction succeeded for ${mediaSourceName}`)
				
				// Trigger feedback updates after successful action
				this.checkFeedbacks()
			} catch (error) {
				this.log('error', `triggermediainputaction failed for ${mediaSourceName}: ${error.message}`)
			}
		},
	}

	actions['media_tab_previous'] = {
		name: 'Media Tab Previous',
		description: 'Previous track for the specified media tab',
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: 'current',
				choices: [
					{ id: 'current', label: '<CURRENT TAB>' },
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
		],
		callback: async (action) => {
			const targetTab = action.options.mediaTab === 'current' ? 
				this.getVariableValue('active_media_tab') || '1' : 
				action.options.mediaTab

			const mediaSourceName = this.getVariableValue(`media_tab_${targetTab}_source`)
			if (!mediaSourceName) {
				this.log('warn', `No media source configured for Media Tab ${targetTab}`)
				return
			}

			// log and check media status before triggering action
			this.log('debug', `media tab ${targetTab} previous - checking status for source: ${mediaSourceName}`)
			
			try {
				const mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: mediaSourceName })
				this.log('debug', `getmediaplayerinputstatus response for ${mediaSourceName}:`, JSON.stringify(mediaStatus, null, 2))
			} catch (error) {
				this.log('warn', `failed to get media status for ${mediaSourceName}: ${error.message}`)
			}

			// Flash feedback
			this.states.mediaTabPreviousFlash = true
			this.checkFeedbacks('media_tab_previous_flash')
			setTimeout(() => {
				this.states.mediaTabPreviousFlash = false
				this.checkFeedbacks('media_tab_previous_flash')
			}, 200)

			this.log('debug', `media tab ${targetTab} - sending previous action to ${mediaSourceName}`)

			// note: triggermediaplayerinputaction not implemented in this cre8 version
			try {
				this.log('debug', `attempting triggermediainputaction for ${mediaSourceName}`)
				await this.sendRequest('TriggerMediaInputAction', {
					inputName: mediaSourceName,
					mediaAction: 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_PREVIOUS',
				})
				this.log('debug', `triggermediainputaction succeeded for ${mediaSourceName}`)
				
				// Trigger feedback updates after successful action
				this.checkFeedbacks()
			} catch (error) {
				this.log('error', `triggermediainputaction failed for ${mediaSourceName}: ${error.message}`)
			}
		},
	}

	actions['configure_media_tab'] = {
		name: 'Configure Media Tab Source',
		description: 'Assign a media source to a specific media tab',
		options: [
			{
				type: 'dropdown',
				label: 'Media Tab',
				id: 'mediaTab',
				default: '1',
				choices: [
					// need a default set to nothing to force user selection else doesn't set to anything
					{ id: '', label: 'Select Media Tab' },
					{ id: '1', label: 'Media Tab 1' },
					{ id: '2', label: 'Media Tab 2' },
					{ id: '3', label: 'Media Tab 3' },
					{ id: '4', label: 'Media Tab 4' },
					{ id: '5', label: 'Media Tab 5' },
				],
			},
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: this.mediaSourceList?.[0] ? this.mediaSourceList[0].id : '',
				choices: this.mediaSourceList,
			},
		],
		callback: async (action) => {
			// guard clause: do nothing if no tab is selected
			if (!action.options.mediaTab || action.options.mediaTab === '') {
				this.log('warn', 'configure media tab: no media tab selected, action cancelled')
				return
			}
			
			// configure which media source belongs to which tab
			const tabNumber = action.options.mediaTab
			const sourceName = action.options.source

			this.setVariableValues({
				[`media_tab_${tabNumber}_source`]: sourceName,
				// automatically set this as the active tab when configuring
				active_media_tab: tabNumber
			})

			this.log('info', `configured media tab ${tabNumber} to use source: ${sourceName}`)
			this.log('debug', `set active media tab to: ${tabNumber}`)
			
			// Trigger feedback updates for tab configuration
			this.checkFeedbacks()
			
			// test the configured source by checking its status and updating states
			if (sourceName) {
				try {
					// get media status for the newly configured source
					const mediaStatus = await this.sendRequest('GetMediaPlayerInputStatus', { inputName: sourceName })
					this.log('debug', `getmediaplayerinputstatus for newly configured media tab ${tabNumber} (${sourceName}):`, JSON.stringify(mediaStatus, null, 2))
					
					// update loop state variables with current values from API
					const validName = this.sources[sourceName]?.validName ?? sourceName
					const trackLoopState = mediaStatus.mediaLoop || false
					const playlistLoopState = mediaStatus.mediaPlaylistLoop || false
					
					this.setVariableValues({
						[`media_loop_state_${validName}`]: trackLoopState ? 'true' : 'false',
						[`media_playlist_loop_state_${validName}`]: playlistLoopState ? 'true' : 'false'
					})
					
					// update media state for play/pause feedback
					if (!this.mediaSources[sourceName]) {
						this.mediaSources[sourceName] = {}
					}
					this.mediaSources[sourceName].mediaState = mediaStatus.mediaState || 'CRE8_MEDIA_STATE_STOPPED'
					
					this.log('debug', `updated variables for configured ${sourceName}: track=${trackLoopState}, playlist=${playlistLoopState}, state=${mediaStatus.mediaState}`)
					
					// trigger select tab action to ensure UI updates
					this.log('debug', `triggering select tab action for tab ${tabNumber} (${sourceName})`)
					await this.sendRequest('TriggerMediaInputAction', { 
						inputName: sourceName, 
						mediaAction: 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_SELECT_TAB' 
					})
					this.log('info', `triggered select tab action for media tab ${tabNumber} (${sourceName}) using mediaAction: CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_SELECT_TAB`)
					
					// final feedback update after all state changes
					this.checkFeedbacks()
					
				} catch (error) {
					this.log('warn', `failed to get media status for newly configured media tab ${tabNumber} (${sourceName}): ${error.message}`)
				}
			}
		},
	}

	actions['set_media_time'] = {
		name: 'Set Media Time',
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: 'currentMedia',
				choices: this.mediaSourceListCurrentMedia,
			},
			{
				type: 'number',
				label: 'Timecode (in seconds)',
				id: 'mediaTime',
				default: 1,
			},
		],
		callback: (action) => {
			this.sendRequest('SetMediaInputCursor', {
				inputName: action.options.source === 'currentMedia' ? this.states.currentMedia : action.options.source,
				mediaCursor: action.options.mediaTime * 1000,
			})
		},
	}
	actions['scrub_media'] = {
		name: 'Scrub Media',
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: 'currentMedia',
				choices: this.mediaSourceListCurrentMedia,
			},
			{
				type: 'number',
				label: 'Scrub Amount (in seconds, positive or negative)',
				id: 'scrubAmount',
				default: 1,
			},
		],
		callback: (action) => {
			this.sendRequest('OffsetMediaInputCursor', {
				inputName: action.options.source === 'currentMedia' ? this.states.currentMedia : action.options.source,
				mediaCursorOffset: action.options.scrubAmount * 1000,
			})
		},
	}
	actions['open_projector'] = {
		name: 'Open Projector',
		options: [
			{
				type: 'dropdown',
				label: 'Projector Type',
				id: 'type',
				default: 'Multiview',
				choices: [
					{ id: 'Multiview', label: 'Multiview' },
					{ id: 'Preview', label: 'Preview' },
					{ id: 'StudioProgram', label: 'Program' },
					{ id: 'Source', label: 'Source' },
					{ id: 'Scene', label: 'Scene' },
				],
			},
			{
				type: 'dropdown',
				label: 'Window Type',
				id: 'window',
				default: 'window',
				choices: [
					{ id: 'window', label: 'Window' },
					{ id: 'fullscreen', label: 'Fullscreen' },
				],
			},
			{
				type: 'dropdown',
				label: 'Display',
				id: 'display',
				default: 0,
				choices: this.monitors,
				isVisible: (options) => options.window === 'fullscreen',
			},
			{
				type: 'dropdown',
				label: 'Source / Scene (required if selected as projector type)',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoicesWithScenes,
				isVisible: (options) => options.type === 'Source' || options.type === 'Scene',
			},
		],
		callback: (action) => {
			let monitor = action.options.window === 'window' ? -1 : action.options.display
			let requestType
			let requestData
			if (action.options.type === 'Multiview') {
				requestType = 'OpenVideoMixProjector'
				requestData = {
					videoMixType: 'CRE8_WEBSOCKET_VIDEO_MIX_TYPE_MULTIVIEW',
					monitorIndex: monitor,
				}
			} else if (action.options.type === 'Preview') {
				requestType = 'OpenVideoMixProjector'
				requestData = {
					videoMixType: 'CRE8_WEBSOCKET_VIDEO_MIX_TYPE_PREVIEW',
					monitorIndex: monitor,
				}
			} else if (action.options.type === 'StudioProgram') {
				requestType = 'OpenVideoMixProjector'
				requestData = {
					videoMixType: 'CRE8_WEBSOCKET_VIDEO_MIX_TYPE_PROGRAM',
					monitorIndex: monitor,
				}
			} else if (action.options.type === 'Source' || action.options.type === 'Scene') {
				requestType = 'OpenSourceProjector'
				requestData = {
					sourceName: action.options.source,
					monitorIndex: monitor,
				}
			}
			this.sendRequest(requestType, requestData)
		},
	}
	actions['source_properties'] = {
		name: 'Set Source Transform',
		description: 'All transform values optional, any parameter left blank is ignored',
		options: [
			{
				type: 'dropdown',
				label: 'Scene (optional, defaults to current scene)',
				id: 'scene',
				default: 'Current Scene',
				choices: this.sceneChoicesProgramPreview,
			},
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Position - X (pixels)',
				id: 'positionX',
				default: '',
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Position - Y (pixels)',
				id: 'positionY',
				default: '',
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Scale - X (multiplier, 1 is 100%)',
				id: 'scaleX',
				default: '',
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Scale - Y (multiplier, 1 is 100%)',
				id: 'scaleY',
				default: '',
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Rotation (degrees clockwise)',
				id: 'rotation',
				default: '',
			},
		],
		callback: async (action) => {
			let sourceScene
			if (action.options.scene == 'Current Scene') {
				sourceScene = this.states.programScene
			} else if (action.options.scene == 'Preview Scene') {
				sourceScene = this.states.previewScene
			} else {
				sourceScene = action.options.scene
			}

			let positionX = await this.parseVariablesInString(action.options.positionX)
			let positionY = await this.parseVariablesInString(action.options.positionY)
			let scaleX = await this.parseVariablesInString(action.options.scaleX)
			let scaleY = await this.parseVariablesInString(action.options.scaleY)
			let rotation = await this.parseVariablesInString(action.options.rotation)

			let transform = {}
			if (positionX) {
				transform.positionX = Number(positionX)
			}
			if (positionY) {
				transform.positionY = Number(positionY)
			}
			if (scaleX) {
				transform.scaleX = Number(scaleX)
			}
			if (scaleY) {
				transform.scaleY = Number(scaleY)
			}
			if (rotation) {
				transform.rotation = Number(rotation)
			}

			let sceneItem = await this.sendRequest('GetSceneItemId', {
				sceneName: sourceScene,
				sourceName: action.options.source,
			})

			if (sceneItem?.sceneItemId) {
				this.sendRequest('SetSceneItemTransform', {
					sceneName: sourceScene,
					sceneItemId: sceneItem?.sceneItemId,
					sceneItemTransform: transform,
				})
			}
		},
	}
	actions['openInputPropertiesDialog'] = {
		name: 'Open Source Properties Window',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
			},
		],
		callback: (action) => {
			this.sendRequest('OpenInputPropertiesDialog', { inputName: action.options.source })
		},
	}
	actions['openInputFiltersDialog'] = {
		name: 'Open Source Filters Window',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
			},
		],
		callback: (action) => {
			this.sendRequest('OpenInputFiltersDialog', { inputName: action.options.source })
		},
	}
	actions['openInputInteractDialog'] = {
		name: 'Open Source Interact Window',
		options: [
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: this.sourceListDefault,
				choices: this.sourceChoices,
			},
		],
		callback: (action) => {
			this.sendRequest('OpenInputInteractDialog', { inputName: action.options.source })
		},
	}
	actions['custom_command'] = {
		name: 'Custom Command',
		options: [
			{
				type: 'textinput',
				useVariables: true,
				label: 'Request Type',
				id: 'command',
				default: 'SetCurrentProgramScene',
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'Request Data (optional, JSON formatted)',
				id: 'arg',
				default: '{"sceneName": "Scene 1"}',
			},
		],
		callback: async (action) => {
			let command = await this.parseVariablesInString(action.options.command)
			let arg = ''
			try {
				command.replace(/ /g, '')
			} catch (e) {
				this.log('warn', 'Request data must be formatted as valid JSON.')
				return
			}

			if (action.options.arg) {
				arg = await this.parseVariablesInString(action.options.arg)
				try {
					arg = JSON.parse(arg)
				} catch (e) {
					this.log('warn', 'Request data must be formatted as valid JSON.')
					return
				}
			}
			this.sendRequest(command, arg ? arg : {})
		},
	}
	actions['vendorRequest'] = {
		name: 'Custom Vendor Request',
		options: [
			{
				type: 'textinput',
				useVariables: true,
				label: 'vendorName',
				id: 'vendorName',
				default: '',
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'requestType',
				id: 'requestType',
				default: '',
			},
			{
				type: 'textinput',
				useVariables: true,
				label: 'requestData',
				id: 'requestData',
				default: '',
			},
		],
		callback: async (action) => {
			let vendorName = await this.parseVariablesInString(action.options.vendorName)
			let requestType = await this.parseVariablesInString(action.options.requestType)
			let requestData = ''
			try {
				vendorName.replace(/ /g, '')
				requestType.replace(/ /g, '')
			} catch (e) {
				this.log('warn', 'Unknown vendor or request format')
				return
			}

			if (action.options.requestData) {
				requestData = await this.parseVariablesInString(action.options.requestData)
				try {
					requestData = JSON.parse(requestData)
				} catch (e) {
					this.log('warn', 'Request data must be formatted as valid JSON.')
					return
				}
			}
			let data = {
				vendorName: vendorName,
				requestType: requestType,
				requestData: requestData,
			}
			this.sendRequest('CallVendorRequest', data)
		},
	}
	
	actions['select_dsk_tab'] = {
		name: 'Select DSK Tab',
		description: 'Set which DSK tab to view/control with the DSK item buttons (does not toggle DSK items)',
		options: [
			{
				type: 'dropdown',
				label: 'DSK Tab',
				id: 'dskTab',
				default: '1',
				choices: this.dskTabChoices,
			},
		],
			callback: async (action) => {
			const dskTab = await this.parseVariablesInString(action.options.dskTab);
			const dskTabIdx = parseInt(dskTab) - 1;
			
			if (isNaN(dskTabIdx) || dskTabIdx < 0) {
				console.log('Invalid DSK tab selection:', dskTab);
				return;
			}
			
			console.log(`Selecting DSK tab ${dskTab} for viewing (no toggling)`);
			
			// Set the active DSK tab variable for DSK item buttons to control
			this.setVariableValues({
				'active_dsk_tab': dskTab
			});
			
			// Load DSK items for the selected tab if not already loaded
			if (!this.dskItemChoicesByTab?.[dskTabIdx] || this.dskItemChoicesByTab[dskTabIdx].length === 0) {
				console.log(`Loading DSK items for selected tab ${dskTabIdx}`);
				await this.buildDSKItems(dskTabIdx);
			}
			
			// Update DSK item feedbacks to show items from the newly selected tab
			this.checkFeedbacks('dsk_item_active', 'dsk_tab_selected');
			
			const availableItems = this.dskItemChoicesByTab[dskTabIdx]?.length || 0;
			console.log(`Now viewing tab ${dskTab}, available items: ${availableItems}`);
			
			// Log the available DSK items in this tab
			if (this.dskItemChoicesByTab[dskTabIdx]) {
				console.log(`DSK items in tab ${dskTab}:`, this.dskItemChoicesByTab[dskTabIdx].map(item => item.id));
			}
		},
	}

	actions['select_dsk_item'] = {
		name: 'Toggle DSK Item',
		description: 'Toggle a specific DSK item (1-4) within the currently selected tab',
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
			{
				type: 'dropdown',
				label: 'Action',
				id: 'action',
				default: 'toggle',
				choices: [
					{ id: 'toggle', label: 'Toggle' },
					{ id: 'on', label: 'Turn On' },
					{ id: 'off', label: 'Turn Off' },
				],
			},
		],
		callback: async (action) => {
			// Get the currently selected DSK tab
			const selectedDskTab = this.getVariableValue('active_dsk_tab') || '1';
			const dskTabIdx = parseInt(selectedDskTab) - 1;
			const itemPosition = parseInt(action.options.dskItemPosition) - 1; // Convert to 0-based
			
			console.log(`Toggling DSK Item: Selected Tab ${selectedDskTab}, Item Position ${action.options.dskItemPosition}, Action: ${action.options.action}`);
			
			if (dskTabIdx < 0) {
				console.log('No valid DSK tab selected for item control');
				return;
			}
			
			// Get the available DSK items for the selected tab
			let tabItems = this.dskItemChoicesByTab[dskTabIdx] || [];
			if (tabItems.length === 0) {
				console.log(`No DSK items loaded for selected tab ${selectedDskTab}, loading now...`);
				// Try to load items for this tab
				await this.buildDSKItems(dskTabIdx);
				tabItems = this.dskItemChoicesByTab[dskTabIdx] || [];
				if (tabItems.length === 0) {
					console.log(`No DSK items available in selected tab ${selectedDskTab}`);
					return;
				}
			}
			
			// Check if the requested position exists in the selected tab
			if (itemPosition >= tabItems.length) {
				console.log(`DSK item position ${action.options.dskItemPosition} not available in selected tab ${selectedDskTab} (only ${tabItems.length} items available)`);
				return;
			}
			
			// Get the DSK item at the specified position in the selected tab
			const selectedItem = tabItems[itemPosition];
			const dskItemName = selectedItem.id;
			
			console.log(`Toggling DSK item: "${dskItemName}" at position ${action.options.dskItemPosition} in selected tab ${selectedDskTab}`);
			
			// Determine the action
			let enabled;
			const currentState = this.dskStates?.[dskTabIdx]?.[dskItemName] || false;
			
			switch (action.options.action) {
				case 'on':
					enabled = 'true';
					break;
				case 'off':
					enabled = 'false';
					break;
				case 'toggle':
				default:
					enabled = currentState ? 'false' : 'true';
					break;
			}
			
			console.log(`DSK Item Toggle: ${dskItemName} in tab ${dskTabIdx} - ${currentState} → ${enabled === 'true'}`);
			
			// EXCLUSIVE MODE: When turning ON a DSK, turn off all other DSKs in the same tab
			if (enabled === 'true') {
				console.log(`Exclusive mode: Turning off other DSKs in selected tab ${selectedDskTab} before enabling ${dskItemName}`);
				
				// Turn off all other DSK items in the selected tab
				for (const item of tabItems) {
					if (item.id !== dskItemName) {
						console.log(`Exclusive mode: Turning off ${item.id} in tab ${dskTabIdx}`);
						
						this.sendRequest('CallVendorRequest', {
							vendorName: "downstream-keyer", 
							requestType: 'set_dsk_item', 
							requestData: {
								dskTabIdx: dskTabIdx,
								dskItem: item.id,
								enabled: 'false',
							}
						});
						
						// Update local state for the turned-off item
						if (!this.dskStates[dskTabIdx]) {
							this.dskStates[dskTabIdx] = {};
						}
						this.dskStates[dskTabIdx][item.id] = false;
					}
				}
			}
			
			// Send request for the selected DSK item
			this.sendRequest('CallVendorRequest', {
				vendorName: "downstream-keyer", 
				requestType: 'set_dsk_item', 
				requestData: {
					dskTabIdx: dskTabIdx,
					dskItem: dskItemName,
					enabled: enabled,
				}
			});
			
			// Update local state
			if (!this.dskStates[dskTabIdx]) {
				this.dskStates[dskTabIdx] = {};
			}
			
			const newState = enabled === 'true';
			this.dskStates[dskTabIdx][dskItemName] = newState;
			
			console.log(`DSK Item state updated: Tab ${dskTabIdx}, ${dskItemName} = ${newState}`);
			
			// Update feedbacks: both the item buttons and the tab buttons (to show tab state changed)
			this.checkFeedbacks('dsk_tab_active', 'dsk_item_active', 'dsk_display_active');
			this.updateDSKDisplay();
		}
	}

	actions['toggle_dsk_tab_simple'] = {
		name: 'Toggle DSK Tab (Simple)',
		description: 'Toggle the first DSK item in the selected tab (simplified - one DSK per tab)',
		options: [
			{
				type: 'dropdown',
				label: 'DSK Tab',
				id: 'dskTab',
				default: '1',
				choices: this.dskTabChoices,
			},
		],
		callback: async (action) => {
			let dskTab = await this.parseVariablesInString(action.options.dskTab)

			if (isNaN(dskTab) || dskTab === undefined || dskTab === null || dskTab === "") return;
			const dskTabIdx = parseInt(dskTab) - 1;
			if (dskTabIdx < 0) return;

			// Make sure DSK items are loaded for this tab
			if (!this.dskItemChoicesByTab?.[dskTabIdx] || this.dskItemChoicesByTab[dskTabIdx].length === 0) {
				console.log(`DSK Tab Simple Toggle: Loading DSK items for tab ${dskTabIdx}`);
				await this.buildDSKItems(dskTabIdx);
			}

			// Get the first (and presumably only) DSK item in this tab
			const tabItems = this.dskItemChoicesByTab[dskTabIdx] || [];
			if (tabItems.length === 0) {
				console.log(`DSK Tab Simple Toggle: No DSK items found in tab ${dskTabIdx}`);
				return;
			}

			// Use the first DSK item in the tab
			const dskItem = tabItems[0].id;
			console.log(`DSK Tab Simple Toggle: Controlling ${dskItem} in tab ${dskTabIdx}`);

			// Get current state and toggle it
			const currentState = this.dskStates?.[dskTabIdx]?.[dskItem] || false;
			const newState = !currentState;
			const enabled = newState.toString();

			console.log(`DSK Tab Simple Toggle: ${dskItem} in tab ${dskTabIdx} - ${currentState} → ${newState}`);

			// Send request to toggle the DSK
			this.sendRequest('CallVendorRequest', {
				vendorName: "downstream-keyer", 
				requestType: 'set_dsk_item', 
				requestData: {
					dskTabIdx: dskTabIdx,
					dskItem: dskItem,
					enabled: enabled,
				}
			});

			console.log("DSK Tab Simple Toggle: Request sent, updating local state manually");
			
			// Update local state manually (workaround for missing server events)
			if (!this.dskStates[dskTabIdx]) {
				this.dskStates[dskTabIdx] = {};
			}
			
			this.dskStates[dskTabIdx][dskItem] = newState;
			console.log(`DSK Tab Simple Toggle: Local state updated - Tab ${dskTabIdx}, ${dskItem} = ${newState}`);
			
			// Update feedbacks and variables
			this.checkFeedbacks('dsk_tab_simple_active');
			this.updateDSKDisplay();
			
			// Update the DSK name variable for this tab
			this.updateDSKNameVariable(dskTabIdx);
		},
	}

	actions['audio_control_knob'] = {
		name: 'Audio Source Control',
		description: 'Audio knobs will allow for the audio sources and AUX\'s to be cycled through, and to adjust level',
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
			{
				type: 'dropdown',
				label: 'Direction',
				id: 'select_direction',
				default: 'left',
				choices: [
					{id: "left", label: "Left"},
					{id: "right", label: "Right"}
				],
			},
		],
		callback: async (action) => {
			this.log('the direction is ', action.options.select_direction, action.options.source_index, action.options.select_direction.right?.value );
			this.audioControlKnob(action.options.source_index, action.options.select_direction === "right" ? 1 : -1);

		}
	}

	actions['audio_control_type_update'] = {
		name: 'Audio Control Type',
		description: 'Source selection or Audio volume control',
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
			}
		],
		callback: async (action) => {
			const sourceVarKeys = ['audio_control_type_1', 'audio_control_type_2', 'audio_control_type_3', 'audio_control_type_4'];
			this.log('the source index is ', action.options.source_index);
			this.updateAudioControlSourceType(sourceVarKeys[action.options.source_index]);
		}
	}

	// action required for setting the custom scene name
	actions['set_custom_scene_name'] = {
		name: 'Set Custom Scene Name',
		options: [
			{
				type: 'textinput',
				label: 'Custom Scene Name',
				id: 'custom_scene_name',
			},
		],
		callback: async (action) => {
			this.setVariableValues({
				custom_scene_name: action.options.custom_scene_name,
			})
		},
	}

	actions['set_dsk_display'] = {
		name: 'Set DSK Display',
		options: [
			{
				type: 'textinput',
				label: 'DSK Display (Format: tab:item, e.g., "1:DSK 1")',
				id: 'dsk_display',
				default: '1:DSK 1',
			},
		],
		callback: async (action) => {
			const input = action.options.dsk_display;
			this.setVariableValues({
				dsk_display: input,
			});
			// Update the display value
			this.updateDSKDisplay(input);
		},
	}

	actions['program_volume_control'] = {
		name: 'Program Volume Control',
		description: 'Control the volume of the PGM audio output via rotary knob',
		options: [
			{
				type: 'dropdown',
				label: 'Direction',
				id: 'direction',
				default: 'right',
				choices: [
					{id: "left", label: "Left (Decrease)"},
					{id: "right", label: "Right (Increase)"}
				],
			},
			{
				type: 'number',
				label: 'Volume step multiplier',
				id: 'step',
				default: 1,
				min: 0.1,
				max: 10,
				range: false,
			},
		],
		callback: async (action) => {
			const direction = action.options.direction === "right" ? 1 : -1;
			const step = action.options.step || 1;
			
			// Use PGM as the target source (same logic as audioControlKnob)
			// const sourceName = 'AUX1';
			// const sourceName = 'AUX2';
			const sourceName = 'PGM';
			
			// Use the same vendor request logic as audioControlKnob for PGM
			const trackIdx = this.getAuxIdxFromName(sourceName);
			const increment = direction * step * 100; // Same logic as audioControlKnob
			
			this.sendRequest('CallVendorRequest', {
				vendorName: "cre8-app-main-controls", 
				requestType: 'set_track_volume_byinc', 
				requestData: {
					"track-idx": trackIdx, 
					"increment": increment
				}
			});
			
			this.log('debug', `PGM volume adjusted via vendor request: trackIdx=${trackIdx}, increment=${increment}`);
		}
	}

	actions['quick_cut'] = {
		name: 'Quick Cut',
		description: 'Performs a cut transition with anti-spam protection',
		options: [],
		callback: async (action) => {
			// Anti-spam protection
			if (this.states.transitionActive) {
				console.log('Cut blocked: Transition already in progress');
				return;
			}

			// Store current transition settings
			const originalTransition = this.states.currentTransition;
			const originalDuration = this.states.transitionDuration;
			
			this.states.originalTransition = originalTransition;

			// Set flag to indicate this is a quick cut and trigger feedback immediately
			this.states.isQuickCut = true;
			this.checkFeedbacks('quick_cut_flash', 'transition_active', 'current_transition');

			// Perform cut without changing the persistent transition setting
			await this.sendBatch([
				{
					requestType: 'SetCurrentSceneTransition',
					requestData: { transitionName: 'Cut' },
				},
				{
					requestType: 'SetCurrentSceneTransitionDuration',
					requestData: { transitionDuration: 50 },
				},
				{
					requestType: 'TriggerStudioModeTransition',
				},
				{
					requestType: 'Sleep',
					requestData: { sleepMillis: 100 }, 
				},
				{
					requestType: 'SetCurrentSceneTransition',
					requestData: { transitionName: originalTransition },
				},
				{
					requestType: 'SetCurrentSceneTransitionDuration',
					requestData: { transitionDuration: Math.max(originalDuration, 50) },
				}
			]);

			// Clear the quick cut flag and original transition after flash duration
			setTimeout(() => {
				this.states.isQuickCut = false;
				this.states.originalTransition = null;
				this.checkFeedbacks('quick_cut_flash', 'transition_active', 'current_transition');
			}, 200);
		},
	}

	actions['fade_to_black'] = {
		name: 'Fade to Black',
		description: 'Toggles between current scene and black scene with fade transition',
		options: [
			{
				type: 'textinput',
						label: 'Black Scene Name',
						id: 'blackSceneName',
						default: 'Black',
						tooltip: 'Name of the scene that represents black (should be a scene with no sources or black background)',
			},
			{
				type: 'number',
				label: 'Duration (in ms)',
				id: 'duration',
				default: 1000,
				min: 0,
				max: 60 * 1000,
				range: false,
			},
		],
		callback: async (action) => {
			// Anti-spam protection
			if (this.states.transitionActive) {
				console.log('Fade to black blocked: Transition already in progress');
				return;
			}

			// Ensure Studio Mode is enabled
			if (!this.states.studioMode) {
				console.log('Enabling Studio Mode for fade to black');
				await this.sendRequest('SetStudioModeEnabled', { studioModeEnabled: true });
				// Wait a moment for studio mode to activate
				await new Promise(resolve => setTimeout(resolve, 100));
			}

			const duration = action.options.duration || 1000;
			const blackSceneName = action.options.blackSceneName || 'Black';
			const currentProgramScene = this.states.programScene;
			const revertTransition = this.states.currentTransition;
			const revertTransitionDuration = this.states.transitionDuration > 0 ? this.states.transitionDuration : 500;

			// Initialize lastNonBlackScene if it doesn't exist
			if (!this.lastNonBlackScene) {
				this.lastNonBlackScene = currentProgramScene;
			}

			// Determine if we're currently on the black scene or not
			const isCurrentlyBlack = currentProgramScene === blackSceneName;
			
			let targetScene;
			if (isCurrentlyBlack) {
				// We're on black, fade back to the last non-black scene
				targetScene = this.lastNonBlackScene || this.sceneChoices?.[0]?.id || 'Scene 1';
				console.log(`Fade from black: Returning to ${targetScene}`);
			} else {
				// We're not on black, store current scene and fade to black
				this.lastNonBlackScene = currentProgramScene;
				targetScene = blackSceneName;
				console.log(`Fade to black: Going from ${currentProgramScene} to ${targetScene}`);
			}

			// Set preview to target scene and perform fade transition
			await this.sendBatch([
				{
					requestType: 'SetCurrentPreviewScene',
					requestData: { sceneName: targetScene },
				},
				{
					requestType: 'SetCurrentSceneTransition',
					requestData: { transitionName: 'Fade' },
				},
				{
					requestType: 'SetCurrentSceneTransitionDuration',
					requestData: { transitionDuration: duration },
				},
				{
					requestType: 'TriggerStudioModeTransition',
				},
				{
					requestType: 'Sleep',
					requestData: { sleepMillis: duration + 100 },
				},
				{
					requestType: 'SetCurrentSceneTransition',
					requestData: { transitionName: revertTransition },
				},
				{
					requestType: 'SetCurrentSceneTransitionDuration',
					requestData: { transitionDuration: revertTransitionDuration },
				}
			]);
		},
	}

	actions['toggle_media_with_button'] = {
		name: 'Toggle Media with Button Text',
		description: 'Toggles media play/pause and updates button text variable',
		options: [
			{
				type: 'dropdown',
				label: 'Media Source',
				id: 'source',
				default: 'currentMedia',
				choices: this.mediaSourceListCurrentMedia,
			},
		],
		callback: (action) => {
			let media = action.options.source === 'currentMedia' ? this.states.currentMedia : action.options.source
			
			if (!media) {
				return
			}
			
			let playPause
			if (this.mediaSources[media]?.mediaState == 'CRE8_MEDIA_STATE_PLAYING') {
				playPause = 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE'
				this.setVariableValues({ current_media_button_text: 'Play' })
			} else {
				playPause = 'CRE8_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY'
				this.setVariableValues({ current_media_button_text: 'Pause' })
			}
			
			this.sendRequest('TriggerMediaPlayerInputAction', {
				inputName: media,
				mediaAction: playPause,
			})
		},
	}

	
	return actions
}



