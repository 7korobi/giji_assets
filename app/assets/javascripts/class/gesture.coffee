class Gesture
  constructor: (event)->
    @size = 100
    @timer = 400
    @ondown = @onup = @onright = @onleft = @onmove = ->

    @start event if event

  start: ({pageX, pageY, target})->
    @pStart =
      x: pageX
      y: pageY
      at: _.now()
      target: target

  move: ({pageX, pageY, target})->
    @pEnd =
      x: pageX
      y: pageY
      at: _.now()
      target: target

    if @pStart? && @pEnd?
      @diff =
        x:  @pEnd.x  - @pStart.x
        y:  @pEnd.y  - @pStart.y
        at: @pEnd.at - @pStart.at
    else
      @diff = null

    is_fast = @diff? && @timer < @diff.at 
    @onmove @diff, is_fast

  end: (event)->
    if @pStart? && @pEnd?
      @pEnd.at = _.now()

      if @diff?
        @diff.at = @pEnd.at - @pStart.at
        @fire()

    @cancel event

  cancel: (event)->
    @pStart = @pEnd = null

  fire: ->
    is_fast = @diff? &&  @diff.at < @timer
    if Math.abs(@diff.x) < @size
      if Math.abs(@diff.y) < @size
      else
        if 0 < @diff.y
          @ondown @diff, is_fast
        else
          @onup   @diff, is_fast
    else
      if Math.abs(@diff.y) < @size
        if 0 < @diff.x
          @onright @diff, is_fast
        else
          @onleft  @diff, is_fast
      else

