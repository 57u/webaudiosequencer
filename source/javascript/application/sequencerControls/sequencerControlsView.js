define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/sequencerControls/sequencerControls.html"
], function(_, Backbone, BaseView, sequencerControlsTemplateString) {
	var SequencerControlsView = BaseView.extend({
		sequencerControlsTemplate: _.template(sequencerControlsTemplateString),

		events: {
			"change .play-stop": function (event) {
				if (event.target.checked)
					this.eventBus.trigger("playSequencer");
				else
					this.eventBus.trigger("stopSequencer");
			},

			"change .bpm": function (event) {
				this.eventBus.trigger("updateBPM", {
					bpm: event.target.value
				});
			}
		},

		modelEvents: {
			"play": "updatePlayStopInput",
			"stop": "updatePlayStopInput",
			"bpm": "updateBPMInput"
		},

		render: function () {
			this.$el.html(this.sequencerControlsTemplate());

			this.playStopInput = this.$el.find(".play-stop");
			this.bpmInput = this.$el.find(".bpm");

			this.updatePlayStopInput();
			this.updateBPMInput();

			return this;
		},

		updatePlayStopInput: function () {
			this.playStopInput.prop("checked", this.model.isPlaying);
		},

		updateBPMInput: function () {
			this.bpmInput.val(this.model.bpm);
		}
	});

	return SequencerControlsView;
});
